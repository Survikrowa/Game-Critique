import { Injectable } from '@nestjs/common';
import { IgdbService } from '../igdb/igdb.service';
import { IGDBGamesDto } from '../igdb/dtos/igdb_games.dto';

@Injectable()
export class SearchService {
  constructor(private readonly igdbService: IgdbService) {}

  async search(input: string): Promise<IGDBGamesDto> {
    const games = await this.igdbService.getGamesBySearch(input);
    if (games.success) {
      return games.data.map((game) => ({
        ...game,
        cover: {
          ...game.cover,
          url: `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`,
        },
      }));
    }
    return [];
  }
}
