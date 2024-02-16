import { Injectable } from '@nestjs/common';
import { HowLongToBeatService } from '../howlongtobeat_parser/howlongtobeat_parser.service';
import { SearchGameResultDtoType } from './search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly hltbParserService: HowLongToBeatService) {}

  async search(input: string): Promise<SearchGameResultDtoType[]> {
    try {
      const games = await this.hltbParserService.search(input);
      return games.hltbSearchResult.map((game) => {
        return {
          id: game.game_id,
          name: game.game_name,
          coverBigUrl: game.coverBigUrl,
          coverSmallUrl: game.coverSmallUrl,
          coverMediumUrl: game.coverMediumUrl,
          firstReleaseDate: game.release_world,
          platforms: game.platforms,
          genres: game.genres,
        };
      });
    } catch (error) {
      return [];
    }
  }
}
