import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import UserAgent from 'user-agents';
import { load } from 'cheerio';

@Injectable()
export class HowLongToBeatScrapperService {
  constructor(private readonly httpService: HttpService) {}

  async getHTMLGamePage(gameId: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(`/game?id=${gameId}`, {
        headers: {
          'User-Agent': new UserAgent().toString(),
          origin: 'https://howlongtobeat.com',
          referer: 'https://howlongtobeat.com',
        },
        timeout: 20000,
      }),
    );
    return { html: data };
  }

  async parseHTMlGamePage(html: string) {
    const $ = load(html);
    let genres: string[] = [];
    let platforms: string[] = [];
    $('div[class*=GameSummary]').each((_, el) => {
      const metaData = $(el).text();
      if (metaData.includes('Genres:')) {
        genres = metaData.replace(/\n/g, '').replace('Genres: ', '').split(',');
      }
      if (metaData.includes('Platform:') || metaData.includes('Platforms:')) {
        platforms = metaData
          .replace(/\n/g, '')
          .replace('Platform: ', '')
          .replace('Platforms: ', '')
          .split(',')
          .map((platform) => platform.trim());
      }
    });
    return {
      genres,
      platforms,
    };
  }

  async getGameDetails(gameId: number) {
    const { html } = await this.getHTMLGamePage(gameId);
    const { genres, platforms } = await this.parseHTMlGamePage(html);
    console.log(`Parsed game details for HLTB ID: ${gameId}`, {
      genres,
      platforms,
    });
    return {
      gameId,
      genres,
      platforms,
    };
  }
}
