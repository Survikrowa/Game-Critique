import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface HowLongToBeatSearchInitResponse {
  token?: string;
}

@Injectable()
export class HowLongToBeatSearchAuthService {
  private readonly logger = new Logger(HowLongToBeatSearchAuthService.name);
  private cachedToken?: string;
  private cacheExpiresAt = 0;
  private readonly cacheTtlMs = 1000 * 60 * 25; // cache token roughly 25 minutes

  constructor(private readonly httpService: HttpService) {}

  async getToken(forceRefresh = false): Promise<string> {
    const now = Date.now();
    if (!forceRefresh && this.cachedToken && now < this.cacheExpiresAt) {
      return this.cachedToken;
    }

    const token = await this.fetchToken();
    this.cachedToken = token;
    this.cacheExpiresAt = now + this.cacheTtlMs;
    return token;
  }

  private async fetchToken(): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<HowLongToBeatSearchInitResponse>(
          `/api/search/init`,
          {
            headers: {
              'User-Agent': this.getUserAgent(),
              origin: 'https://howlongtobeat.com',
              referer: 'https://howlongtobeat.com',
            },
            timeout: 20000,
          },
        ),
      );

      const token = data?.token;
      if (!token) {
        throw new Error('HLTB auth token missing in search init response');
      }

      return token;
    } catch (error: unknown) {
      this.logger.error('Failed to fetch HLTB auth token', error);
      throw error;
    }
  }

  private getUserAgent() {
    return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36';
  }
}
