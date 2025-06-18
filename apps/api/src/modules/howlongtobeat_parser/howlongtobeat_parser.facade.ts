import { Injectable } from '@nestjs/common';
import { HowLongToBeatService } from './howlongtobeat_parser.service';
import { HowLongToBeatScrapperService } from './howlongtobeat_scrapper/howlongtobeat_scrapper.service';

@Injectable()
export class HowLongToBeatParserFacade {
  constructor(
    private readonly hltbParserService: HowLongToBeatService,
    private readonly hltbScrapperService: HowLongToBeatScrapperService,
  ) {}

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

  async fetchGameDetails(hltbId: number) {
    const gameDetails = await this.hltbScrapperService.getGameDetails(hltbId);
    return {
      id: gameDetails.gameId,
      genres: this.hltbParserService.getGenres(gameDetails.genres),
      platforms: this.hltbParserService.getPlatforms(gameDetails.platforms),
    };
  }
}
