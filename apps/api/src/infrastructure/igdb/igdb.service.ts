import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ExternalGameDTO } from '../../modules/games/games.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, isAxiosError } from 'axios';
import { z } from 'zod';
import { IGamesProvider } from '../../modules/games/interfaces/games-provider.interface';
import { OAuthTokenDto } from './igdb.dto';
import { timestampToMs } from '../../modules/date_and_time/time/timestamp_to_ms';

@Injectable()
export class IgdbService implements IGamesProvider {
  private readonly logger = new Logger(IgdbService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private accessToken: string | null = null;
  private tokenExpiration: number = 0;

  async getUpcomingGames(
    limit: number,
    platformIds: number[],
  ): Promise<ExternalGameDTO[]> {
    const now = Math.floor(Date.now() / 1000);
    const platforms = platformIds.join(',');

    const query = `
  fields name, cover.url, screenshots.url, first_release_date, platforms.name, category, url;

  where
    first_release_date > ${now} &
    platforms = (${platforms}) &
    cover != null &
    game_type = (0, 2, 4, 8, 9) &
    version_parent = null;

  sort first_release_date asc;
  limit ${limit};
`;

    const token = await this.getTokenFromOAuth();

    try {
      const { data } = await firstValueFrom(
        this.httpService.post('https://api.igdb.com/v4/games', query, {
          headers: {
            'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      const parsed = z.array(IgdbGameSchema).safeParse(data);
      if (!parsed.success) {
        this.logger.error(
          'Failed to parse IGDB upcoming games response',
          parsed.error,
        );
        return [];
      }

      return parsed.data.map(this.mapToDto);
    } catch (e) {
      this.logger.error('Error fetching games from IGDB', e);
      return [];
    }
  }

  async getTokenFromOAuth(): Promise<string> {
    const now = Date.now();

    if (this.accessToken && this.tokenExpiration > now + 3600 * 1000) {
      return this.accessToken;
    }
    this.logger.log('Refreshing IGDB Access Token...');
    try {
      const { data } = await firstValueFrom<AxiosResponse<OAuthTokenDto>>(
        this.httpService.post('https://id.twitch.tv/oauth2/token', null, {
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

  private mapToDto(game: IgdbGame): ExternalGameDTO {
    return {
      id: game.id.toString(),
      name: game.name,
      url: game.url || '',
      coverUrl: game.cover?.url
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : '',
      backgroundUrl: game.screenshots?.[0]?.url
        ? `https:${game.screenshots[0].url.replace(
            't_thumb',
            't_screenshot_big',
          )}`
        : '',
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000)
        : new Date(0),
      platforms:
        game.platforms?.map((p) => ({
          id: p.id.toString(),
          name: p.name,
        })) || [],
    };
  }

  async searchGameByName(
    name: string,
    slug: string,
  ): Promise<IgdbGameSearchResult | null> {
    const token = await this.getTokenFromOAuth();

    const query = `
search "${name.replace(/"/g, '')}";
fields id, name, slug, url;
limit 5;
`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.post('https://api.igdb.com/v4/games', query, {
          headers: {
            'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      const parsed = z.array(IgdbGameSearchResultSchema).safeParse(data);
      if (!parsed.success) {
        this.logger.error('Failed to parse IGDB search results', parsed.error);
        return null;
      }

      const exactMatch = parsed.data.find((g) => g.slug === slug);

      return exactMatch || parsed.data[0] || null;
    } catch (e) {
      this.logger.error('Error searching game on IGDB', e);
      return null;
    }
  }

  async getGameRatings(
    igdbId: number,
  ): Promise<IgdbGameRatingsResponse | null> {
    const token = await this.getTokenFromOAuth();

    const query = `
fields aggregated_rating, aggregated_rating_count, rating, rating_count, url;
where id = ${igdbId};
`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.post('https://api.igdb.com/v4/games', query, {
          headers: {
            'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      const parsed = z.array(IgdbGameRatingsResponseSchema).safeParse(data);
      if (!parsed.success) {
        this.logger.error(
          'Failed to parse IGDB ratings response',
          parsed.error,
        );
        return null;
      }

      return parsed.data[0] || null;
    } catch (e) {
      this.logger.error('Error fetching game ratings from IGDB', e);
      return null;
    }
  }
}

type IgdbGameSearchResult = z.infer<typeof IgdbGameSearchResultSchema>;

type IgdbGameRatingsResponse = z.infer<typeof IgdbGameRatingsResponseSchema>;

const IgdbGameSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  cover: z.object({ id: z.number(), url: z.string() }).optional(),
  first_release_date: z.number().optional(),
  platforms: z
    .array(
      z.object({ id: z.union([z.number(), z.string()]), name: z.string() }),
    )
    .optional(),
  screenshots: z
    .array(z.object({ id: z.number(), url: z.string() }))
    .optional(),
  url: z.string().optional(),
  slug: z.string().optional(),
  aggregated_rating: z.number().optional(),
  aggregated_rating_count: z.number().optional(),
  rating: z.number().optional(),
  rating_count: z.number().optional(),
});

type IgdbGame = z.infer<typeof IgdbGameSchema>;

const IgdbGameSearchResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  url: z.string().optional(),
});

const IgdbGameRatingsResponseSchema = z.object({
  id: z.number(),
  aggregated_rating: z.number().optional(),
  aggregated_rating_count: z.number().optional(),
  rating: z.number().optional(),
  rating_count: z.number().optional(),
  url: z.string().optional(),
});
