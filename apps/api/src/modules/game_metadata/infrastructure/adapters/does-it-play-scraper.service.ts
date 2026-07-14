import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

const DOES_IT_PLAY_SEARCH_URL = 'https://doesitplay.org/search?q=';
const DOES_IT_PLAY_BASE_URL = 'https://doesitplay.org';

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
  async searchGame(title: string): Promise<DoesItPlaySearchResult[]> {
    const results = await this.fetchSearchResults(title);
    return results.map((result) => ({
      ...result,
      has_physical_release: false,
      has_game_on_disc: false,
    }));
  }

  async getGameDetails(url: string): Promise<DoesItPlayDetail> {
    const response = await fetch(`${DOES_IT_PLAY_BASE_URL}/${url}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; GameCritiqueBot/1.0; +https://gamecritique.app)',
      },
    });
    if (!response.ok)
      return { offlinePlay: null, downloadRequired: null, testerComment: null };

    const html = await response.text();
    const $ = cheerio.load(html);

    const offlinePlay = extractOfflinePlay($);
    const downloadRequired = extractDownloadRequired($);
    const testerComment = extractTesterComment($);

    return { offlinePlay, downloadRequired, testerComment };
  }

  async fetchGameData(
    title: string,
  ): Promise<Array<DoesItPlaySearchResult & DoesItPlayDetail>> {
    const searchResults = await this.searchGame(title);
    if (searchResults.length === 0) return [];

    const resultsWithDetails = await Promise.all(
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

    return resultsWithDetails;
  }

  private async fetchSearchResults(
    title: string,
  ): Promise<
    Array<
      Omit<DoesItPlaySearchResult, 'has_physical_release' | 'has_game_on_disc'>
    >
  > {
    const response = await fetch(
      `${DOES_IT_PLAY_SEARCH_URL}${encodeURIComponent(title)}`,
      {
        headers: { Accept: 'application/json' },
      },
    );
    if (!response.ok) return [];
    return response.json();
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
