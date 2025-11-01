import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DoesItPlayScrapperService } from './doesitplay_scrapper/doesitplay_scrapper.service';
import type {
  DoesItPlaySearchResult,
  DoesItPlayGameInfo,
  DoesItPlayApiSearchResult,
} from './doesitplay_scraper.types';
import { firstValueFrom } from 'rxjs';

export interface DoesItPlayServiceFields {
  searchGame: (title: string) => Promise<DoesItPlaySearchResult[]>;
  getGameDetails: (gameId: string) => Promise<DoesItPlayGameInfo | null>;
}

const MAX_RETRIES = 3;

@Injectable()
export class DoesItPlayService implements DoesItPlayServiceFields {
  private readonly logger = new Logger(DoesItPlayService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly doesItPlayScrapper: DoesItPlayScrapperService,
  ) {}

  async searchGame(title: string): Promise<DoesItPlaySearchResult[]> {
    this.logger.log(`Searching for game: ${title}`);

    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const results = await this.doesItPlayScrapper.searchGame(title);

        return results.map((game) => ({
          gameId: game.gameId,
          gameName: game.gameName,
          gameUrl: game.gameUrl,
          steamDeckStatus: game.steamDeckVerification,
        }));
      } catch (error) {
        retries++;
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(
          `Error searching game (attempt ${retries}): ${errorMessage}`,
        );

        if (retries >= MAX_RETRIES) {
          throw error;
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }

    return [];
  }

  async getGameDetails(gameId: string): Promise<DoesItPlayGameInfo | null> {
    this.logger.log(`Fetching game details for: ${gameId}`);

    return null;
  }

  transformToDoesItPlaySlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async searchGameFromApi(
    gameName: string,
  ): Promise<DoesItPlayApiSearchResult[]> {
    this.logger.log(`Searching DoesItPlay API for game: ${gameName}`);

    const baseUrl = 'https://www.doesitplay.org/search';
    const encodedGameName = encodeURIComponent(gameName);
    const url = `${baseUrl}?q=${encodedGameName}`;

    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const response = await firstValueFrom(
          this.httpService.get<DoesItPlayApiSearchResult[]>(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
          }),
        );

        this.logger.log(
          `Found ${response.data.length} results for "${gameName}"`,
        );
        return response.data;
      } catch (error) {
        retries++;
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(
          `Error fetching from DoesItPlay API (attempt ${retries}): ${errorMessage}`,
        );

        if (retries >= MAX_RETRIES) {
          this.logger.error(
            `Failed to fetch data after ${MAX_RETRIES} attempts`,
          );
          return [];
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }

    return [];
  }
}
