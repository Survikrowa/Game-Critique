import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

const DOES_IT_PLAY_SEARCH_URL = 'https://www.doesitplay.org/search?q=';
const DOES_IT_PLAY_BASE_URL = 'https://www.doesitplay.org';
const FETCH_TIMEOUT_MS = 10_000;

const sanitizeTitle = (title: string): string => {
  return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
};

export type DoesItPlaySearchResult = {
  title: string;
  platform: string;
  platformCode: string;
  testedOn: string;
  region: string | null;
  additionalInfo: string | null;
  cover: string;
  url: string;
  has_physical_release: boolean;
  has_game_on_disc: boolean;
};

export type DoesItPlayDetail = {
  offlinePlay: string | null;
  downloadRequired: string | null;
  testerComment: string | null;
};

const normalizeValue = (value: string | null): string | null => {
  if (!value) return null;
  return value.replace(/\*$/, '');
};

@Injectable()
export class DoesItPlayScraperService {
  constructor(private readonly httpService: HttpService) {}

  async searchGame(title: string): Promise<DoesItPlaySearchResult[]> {
    const results = await this.fetchSearchResults(title);
    return results.map((result) => ({
      ...result,
      has_physical_release: false,
      has_game_on_disc: false,
    }));
  }

  async getGameDetails(url: string): Promise<DoesItPlayDetail> {
    try {
      const { data: html } = await firstValueFrom(
        this.httpService.get<string>(`${DOES_IT_PLAY_BASE_URL}/${url}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (compatible; GameCritiqueBot/1.0; +https://gamecritique.app)',
          },
          timeout: FETCH_TIMEOUT_MS,
        }),
      );

      const $ = cheerio.load(html);
      const offlinePlay = extractOfflinePlay($);
      const downloadRequired = extractDownloadRequired($);
      const testerComment = extractTesterComment($);

      return { offlinePlay, downloadRequired, testerComment };
    } catch {
      return { offlinePlay: null, downloadRequired: null, testerComment: null };
    }
  }

  async fetchGameData(
    title: string,
  ): Promise<Array<DoesItPlaySearchResult & DoesItPlayDetail>> {
    const searchResults = await this.searchGame(title);
    if (searchResults.length === 0) return [];

    const results = await Promise.allSettled(
      searchResults.map(async (result) => {
        const detail = await this.getGameDetails(result.url);
        const offlinePlay = normalizeValue(detail.offlinePlay);
        const downloadRequired = normalizeValue(detail.downloadRequired);

        return {
          ...result,
          ...detail,
          has_physical_release: offlinePlay === 'Yes',
          has_game_on_disc: downloadRequired === 'No',
        };
      }),
    );

    return results
      .filter(
        (
          r,
        ): r is PromiseFulfilledResult<
          DoesItPlaySearchResult & DoesItPlayDetail
        > => r.status === 'fulfilled',
      )
      .map((r) => r.value);
  }

  private async fetchSearchResults(
    title: string,
  ): Promise<
    Array<
      Omit<DoesItPlaySearchResult, 'has_physical_release' | 'has_game_on_disc'>
    >
  > {
    const sanitized = sanitizeTitle(title);
    const encoded = encodeURIComponent(sanitized);
    const url = `${DOES_IT_PLAY_SEARCH_URL}${encoded}`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<string>(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (compatible; GameCritiqueBot/1.0; +https://gamecritique.app)',
          },
          timeout: FETCH_TIMEOUT_MS,
          responseType: 'text',
        }),
      );

      if (typeof data === 'string' && data.trim().startsWith('[')) {
        try {
          const parsed = JSON.parse(data);
          console.log('[DoesItPlay] Parsed JSON results:', parsed?.length);
          return parsed.map((r: Record<string, unknown>) => ({
            title: r.title as string,
            platform: r.platform as string,
            platformCode: r.platformCode as string,
            testedOn: r.testedOn as string,
            region: (r.region as string) || null,
            additionalInfo: (r.additionnalInfo as string) || null,
            cover: (r.cover as string) || '',
            url: r.url as string,
          }));
        } catch (parseError) {
          console.log('[DoesItPlay] JSON parse failed:', parseError);
          return [];
        }
      }

      return [];
    } catch (error) {
      console.log('[DoesItPlay] Fetch error:', error);
      return [];
    }
  }
}

const extractOfflinePlay = ($: cheerio.CheerioAPI): string | null => {
  const text = $('body').text();
  const match = text.match(/Offline play:\s*(Yes\*?|No)/);
  return match ? match[1] : null;
};

const extractDownloadRequired = ($: cheerio.CheerioAPI): string | null => {
  const text = $('body').text();
  const match = text.match(/\*?\)Download required:\s*(No\*?|Yes\*?|No|Yes)/);
  return match ? match[1] : null;
};

const extractTesterComment = ($: cheerio.CheerioAPI): string | null => {
  let comment = '';
  $('p, div').each((_, el) => {
    const text = $(el).text().trim();
    if (
      text.length > 200 &&
      !text.includes('Offline play') &&
      !text.includes('Download required')
    ) {
      comment = text;
    }
  });
  return comment || null;
};
