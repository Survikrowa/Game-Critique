import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  DoesItPlayGameInfo,
  SteamDeckVerification,
} from '../doesitplay_scraper.types';

@Injectable()
export class DoesItPlayScrapperService {
  private readonly logger = new Logger(DoesItPlayScrapperService.name);
  private readonly baseUrl = 'https://www.doesitplay.org';

  async scrapeGameDetails(gameId: string): Promise<DoesItPlayGameInfo | null> {
    try {
      const url = `${this.baseUrl}/game/${gameId}`;
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);

      const gameName = $('h1.game-title').text().trim();
      const verificationStatus = this.parseVerificationStatus($);
      const compatibility = this.parseCompatibility($);

      return {
        gameId,
        gameName,
        gameUrl: url,
        steamDeckVerification: verificationStatus,
        compatibility,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error scraping game ${gameId}: ${errorMessage}`);
      return null;
    }
  }

  async searchGame(gameName: string): Promise<DoesItPlayGameInfo[]> {
    try {
      const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(
        gameName,
      )}`;
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const $ = cheerio.load(response.data);
      const results: DoesItPlayGameInfo[] = [];

      $('.game-list-item').each((_, element) => {
        const gameElement = $(element);
        const gameUrl = gameElement.find('a').attr('href');
        const gameId = gameUrl?.split('/').pop() || '';
        const name = gameElement.find('.game-name').text().trim();
        const status = this.parseVerificationStatusFromElement(gameElement);

        results.push({
          gameId,
          gameName: name,
          gameUrl: `${this.baseUrl}${gameUrl}`,
          steamDeckVerification: status,
        });
      });

      return results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error searching for game "${gameName}": ${errorMessage}`,
      );
      return [];
    }
  }

  private parseVerificationStatus(
    $: cheerio.CheerioAPI,
  ): SteamDeckVerification {
    const statusText = $('.verification-badge').text().toLowerCase();

    if (statusText.includes('verified')) {
      return SteamDeckVerification.VERIFIED;
    } else if (statusText.includes('playable')) {
      return SteamDeckVerification.PLAYABLE;
    } else if (statusText.includes('unsupported')) {
      return SteamDeckVerification.UNSUPPORTED;
    }

    return SteamDeckVerification.UNKNOWN;
  }

  private parseVerificationStatusFromElement(
    element: cheerio.Cheerio<any>,
  ): SteamDeckVerification {
    const statusText = element.find('.verification-badge').text().toLowerCase();

    if (statusText.includes('verified')) {
      return SteamDeckVerification.VERIFIED;
    } else if (statusText.includes('playable')) {
      return SteamDeckVerification.PLAYABLE;
    } else if (statusText.includes('unsupported')) {
      return SteamDeckVerification.UNSUPPORTED;
    }

    return SteamDeckVerification.UNKNOWN;
  }

  private parseCompatibility($: cheerio.CheerioAPI) {
    const details: string[] = [];

    $('.compatibility-detail').each((_, element) => {
      const text = $(element).text().trim();
      if (text) {
        details.push(text);
      }
    });

    const status = $('.compatibility-status').text().trim();
    const notes = $('.compatibility-notes').text().trim();

    return {
      status,
      details,
      notes: notes || undefined,
    };
  }
}
