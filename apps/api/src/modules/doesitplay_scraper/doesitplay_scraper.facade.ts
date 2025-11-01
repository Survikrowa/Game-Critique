import { Injectable } from '@nestjs/common';
import { DoesItPlayService } from './doesitplay_scraper.service';
import { DoesItPlayScrapperService } from './doesitplay_scrapper/doesitplay_scrapper.service';
import {
  DoesItPlayGameInfo,
  SteamDeckVerification,
} from './doesitplay_scraper.types';

@Injectable()
export class DoesItPlayScraperFacade {
  constructor(
    private readonly doesItPlayService: DoesItPlayService,
    private readonly doesItPlayScrapperService: DoesItPlayScrapperService,
  ) {}

  async searchGames(input: string) {
    const games = await this.doesItPlayService.searchGame(input);

    return games.map((game) => ({
      id: game.gameId,
      name: game.gameName,
      url: game.gameUrl,
      steamDeckStatus: game.steamDeckStatus,
      platformCompatibility: game.platformCompatibility,
    }));
  }

  async getGameCompatibility(
    gameId: string,
  ): Promise<DoesItPlayGameInfo | null> {
    return await this.doesItPlayService.getGameDetails(gameId);
  }

  toDoesItPlayUrl(title: string): string {
    return this.doesItPlayService.transformToDoesItPlaySlug(title);
  }
  async getGameSteamDeckStatus(
    gameId: string,
  ): Promise<SteamDeckVerification | undefined> {
    const gameDetails = await this.doesItPlayService.getGameDetails(gameId);
    return gameDetails?.steamDeckVerification;
  }
}
