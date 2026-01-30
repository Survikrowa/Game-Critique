import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ExternalGameDTO } from '../../modules/games/games.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, isAxiosError } from 'axios';
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

  async getUpcomingGames(limit: number): Promise<ExternalGameDTO[]> {
    const now = Math.floor(Date.now() / 1000);

    const query = `
  fields name, cover.url, screenshots.url, first_release_date, platforms.name, category;
  
  where 
    first_release_date > ${now} & 
    platforms = (48,167,49,169,130) & 
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
      this.logger.log(JSON.stringify(data, null, 2));
      return data.map(this.mapToDto);
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
      coverUrl: game.cover?.url
        ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
        : '',
      backgroundUrl: game.screenshots?.[0]?.url
        ? `https:${game.screenshots[0].url.replace(
            't_thumb',
            't_screenshot_big',
          )}`
        : '',
      releaseDate: new Date(game.first_release_date * 1000),
      platforms:
        game.platforms?.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
        })) || [],
    };
  }
}

type IgdbGame = {
  id: string;
  cover: {
    id: string;
    url: string;
  };
  first_release_date: number;
  name: string;
  platforms: IgdbGamePlatform[];
  screenshots: IgdbGameScreenshots[];
};

type IgdbGamePlatform = {
  id: string;
  name: string;
};

type IgdbGameScreenshots = {
  id: string;
  url: string;
};
