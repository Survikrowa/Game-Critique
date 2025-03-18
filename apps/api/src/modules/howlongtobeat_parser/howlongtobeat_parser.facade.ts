import { Injectable } from '@nestjs/common';
import { HowLongToBeatService } from './howlongtobeat_parser.service';

@Injectable()
export class HowLongToBeatParserFacade {
  constructor(private readonly hltbParserService: HowLongToBeatService) {}

  async fetchGames(input: string) {
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
        completionTime: {
          mainStory: game.comp_main,
          mainExtra: game.comp_plus,
          completionist: game.comp_all,
        },
      };
    });
  }

  toHltbSearchUrl(title: string): string {
    return this.hltbParserService.transformToHltbSlug(title);
  }
}
