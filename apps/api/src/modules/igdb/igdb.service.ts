import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { igdbGamesSchema } from './dtos/igdb_games.dto';
import { IgdbAuthService } from './igdb_auth/igdb_auth.service';

@Injectable()
export class IgdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly igdbAuthService: IgdbAuthService,
  ) {}

  async getGamesBySearch(search: string) {
    const token = await this.igdbAuthService.getTokenFromDatabase();
    const { data } = await firstValueFrom(
      this.httpService.post(
        '/games',
        `search "${search}"; fields name,first_release_date,slug,cover.*,release_dates.date, genres.name, genres.slug, url, id, slug, platforms.name, platforms.slug;`,
        {
          headers: {
            'Client-ID': this.configService.get('IGDB_CLIENT_ID'),
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    console.log(data);
    return igdbGamesSchema.safeParse(data);
  }
}
