import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, isAxiosError } from 'axios';
import { z } from 'zod';
import { OAuthTokenDto } from './igdb.dto';
import { IgdbRateLimiter } from './igdb_rate_limiter';
import { IgdbGameRatingsResponseSchema, IgdbGameSchema } from './igdb.schema';
import { IgdbTimeToBeatSchema } from './igdb_time_to_beat.schema';
import { timestampToMs } from '../../modules/date_and_time/time/timestamp_to_ms';
import { CompletionTime } from '../../modules/games/domain/models/external_game.model';

const IGDB_GAMES_ENDPOINT = 'https://api.igdb.com/v4/games';
const IGDB_TIME_TO_BEAT_ENDPOINT = 'https://api.igdb.com/v4/game_time_to_beats';
const TWITCH_TOKEN_ENDPOINT = 'https://id.twitch.tv/oauth2/token';
const TOKEN_REFRESH_MARGIN_SECONDS = 3600;
const GAME_FIELDS =
  'id,name,slug,url,cover.url,first_release_date,platforms.id,platforms.name,platforms.slug,genres.id,genres.name,genres.slug,game_type,version_parent,parent_game';
const UPCOMING_GAME_TYPES = '0,2,4,8,9';

const dropLastToken = (query: string): string => {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length <= 1) return '';
  return tokens.slice(0, -1).join(' ');
};

type IgdbGame = z.infer<typeof IgdbGameSchema>;
type IgdbGameRatingsResponse = z.infer<typeof IgdbGameRatingsResponseSchema>;

@Injectable()
export class IgdbService {
  private readonly logger = new Logger(IgdbService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly rateLimiter: IgdbRateLimiter,
  ) {}

  private accessToken: string | null = null;
  private tokenExpiration = 0;

  async getUpcomingGames(
    limit: number,
    platformIds: number[],
  ): Promise<IgdbGame[]> {
    const now = Math.floor(Date.now() / 1000);
    const platforms = platformIds.join(',');

    const query = `
  fields ${GAME_FIELDS};
  where
    first_release_date > ${now} &
    platforms = (${platforms}) &
    cover != null &
    game_type = (${UPCOMING_GAME_TYPES}) &
    version_parent = null;
  sort first_release_date asc;
  limit ${limit};
`;

    return (await this.postGames(query)) ?? [];
  }

  async searchGames(query: string, limit: number): Promise<IgdbGame[]> {
    const results = await this.searchGamesQuery(query, limit);
    if (results.length > 0) return results;

    const fallbackQuery = dropLastToken(query);
    if (!fallbackQuery) return results;

    return this.searchGamesQuery(fallbackQuery, limit);
  }

  private searchGamesQuery = async (
    query: string,
    limit: number,
  ): Promise<IgdbGame[]> => {
    const sanitized = query.replace(/"/g, '');
    const searchQuery = `
search "${sanitized}";
fields ${GAME_FIELDS};
limit ${limit};
`;

    return (await this.postGames(searchQuery)) ?? [];
  };

  async getGamesByIds(ids: number[]): Promise<IgdbGame[]> {
    if (ids.length === 0) return [];

    const query = `
fields ${GAME_FIELDS};
where id = (${ids.join(',')});
`;

    return (await this.postGames(query)) ?? [];
  }

  async getTimeToBeats(ids: number[]): Promise<Map<number, CompletionTime>> {
    if (ids.length === 0) return new Map();

    const query = `
fields game_id,hastily,normally,completely;
where game_id = (${ids.join(',')});
`;

    const data = await this.post(IGDB_TIME_TO_BEAT_ENDPOINT, query);
    if (!data) return new Map();

    const parsed = z.array(IgdbTimeToBeatSchema).safeParse(data);
    if (!parsed.success) {
      this.logger.error(
        'Failed to parse IGDB game_time_to_beats response',
        parsed.error,
      );
      return new Map();
    }

    const times = new Map<number, CompletionTime>();
    for (const entry of parsed.data) {
      times.set(entry.game_id, {
        main: entry.hastily ?? null,
        mainExtra: entry.normally ?? null,
        completionist: entry.completely ?? null,
      });
    }
    return times;
  }

  async getGameRatings(
    igdbId: number,
  ): Promise<IgdbGameRatingsResponse | null> {
    const query = `
fields aggregated_rating, aggregated_rating_count, rating, rating_count, url;
where id = ${igdbId};
`;

    const data = await this.post(IGDB_GAMES_ENDPOINT, query);
    if (!data) return null;

    const parsed = z.array(IgdbGameRatingsResponseSchema).safeParse(data);
    if (!parsed.success) {
      this.logger.error('Failed to parse IGDB ratings response', parsed.error);
      return null;
    }

    return parsed.data[0] ?? null;
  }

  async getTokenFromOAuth(): Promise<string> {
    const now = Date.now();
    const refreshMarginMs = TOKEN_REFRESH_MARGIN_SECONDS * 1000;

    if (this.accessToken && this.tokenExpiration > now + refreshMarginMs) {
      return this.accessToken;
    }

    this.logger.log('Refreshing IGDB Access Token...');
    try {
      const { data } = await firstValueFrom<AxiosResponse<OAuthTokenDto>>(
        this.httpService.post(TWITCH_TOKEN_ENDPOINT, null, {
          params: {
            client_id: this.configService.get('IGDB_CLIENT_ID'),
            client_secret: this.configService.get('IGDB_CLIENT_SECRET'),
            grant_type: 'client_credentials',
          },
        }),
      );
      this.accessToken = data.access_token;
      this.tokenExpiration = now + timestampToMs(data.expires_in);
      return this.accessToken;
    } catch (e) {
      if (isAxiosError(e)) {
        this.logger.error(
          'Failed to authenticate with Twitch/IGDB',
          e.response?.data || e.message,
        );
      }
      throw e;
    }
  }

  private postGames = async (query: string): Promise<IgdbGame[] | null> => {
    const data = await this.post(IGDB_GAMES_ENDPOINT, query);
    if (!data) return null;

    const parsed = z.array(IgdbGameSchema).safeParse(data);
    if (!parsed.success) {
      this.logger.error('Failed to parse IGDB games response', parsed.error);
      return null;
    }

    return parsed.data;
  };

  private post = async (
    endpoint: string,
    query: string,
  ): Promise<unknown | null> => {
    const token = await this.getTokenFromOAuth();

    try {
      const { data } = await this.rateLimiter.run(() =>
        firstValueFrom<AxiosResponse<unknown>>(
          this.httpService.post(endpoint, query, {
            headers: {
              'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );
      return data;
    } catch (e) {
      this.logger.error('Error communicating with IGDB', e);
      return null;
    }
  };
}
