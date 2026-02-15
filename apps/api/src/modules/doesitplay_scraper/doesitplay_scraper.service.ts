import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type {
  DoesItPlaySearchResult,
  DoesItPlayGameInfo,
  DoesItPlayApiSearchResult,
} from './doesitplay_scraper.types';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface DoesItPlayServiceFields {
  searchGame: (title: string) => Promise<DoesItPlaySearchResult | null>;
  getGameDetails: (gameId: string) => Promise<DoesItPlayGameInfo | null>;
  scrapGameHTML: (gameName: string) => Promise<DoesItPlayGameInfo | null>;
}

const MAX_RETRIES = 3;

@Injectable()
export class DoesItPlayService implements DoesItPlayServiceFields {
  private readonly logger = new Logger(DoesItPlayService.name);
  private readonly baseUrl = 'https://www.doesitplay.org';

  constructor(private readonly httpService: HttpService) {}

  async scrapGameHTML(gameUrl: string): Promise<DoesItPlayGameInfo | null> {
    const searchUrl = `${this.baseUrl}/${gameUrl}`;

    try {
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);
      const hasGameOnDisc = $('.requiredownload').text().includes('No');

      return {
        hasGameOnDisc,
        hasPhysicalRelease: true,
      };
    } catch (error) {
      // Handle 404 or other HTTP errors
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.logger.log(`Game not found (404): ${gameUrl}`);
        return {
          hasPhysicalRelease: false,
          hasGameOnDisc: false,
        };
      }
      // Re-throw other errors to be handled by the retry logic
      throw error;
    }
  }

  async searchGame(gameUrl: string): Promise<DoesItPlaySearchResult | null> {
    this.logger.log(`Searching for game: ${gameUrl}`);

    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const result = await this.scrapGameHTML(gameUrl);

        if (!result) {
          this.logger.log(`No results found for game: ${gameUrl}`);
          return null;
        }

        return result;
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

    return null;
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
