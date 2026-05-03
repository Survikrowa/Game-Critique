import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import UserAgent from 'user-agents';
import { firstValueFrom } from 'rxjs';

export interface HltbAuthData {
  token: string;
  hpKey: string;
  hpVal: string;
  userAgent: string;
}

@Injectable()
export class HowLongToBeatSearchAuthService {
  private readonly logger = new Logger(HowLongToBeatSearchAuthService.name);
  private cachedAuthData?: HltbAuthData;
  private cacheExpiresAt = 0;
  private readonly cacheTtlMs = 1000 * 60 * 25; // cache token roughly 25 minutes

  constructor(private readonly httpService: HttpService) {}

  async getAuthData(forceRefresh = false): Promise<HltbAuthData> {
    const now = Date.now();
    if (!forceRefresh && this.cachedAuthData && now < this.cacheExpiresAt) {
      return this.cachedAuthData;
    }

    const authData = await this.fetchAuthData();
    this.cachedAuthData = authData;
    this.cacheExpiresAt = now + this.cacheTtlMs;
    return authData;
  }

  private async fetchAuthData(): Promise<HltbAuthData> {
    const userAgent = new UserAgent().toString();

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Record<string, unknown>>(`/api/bleed/init`, {
          headers: {
            'User-Agent': userAgent,
            referer: 'https://howlongtobeat.com/',
          },
          params: { t: Date.now() },
          timeout: 20000,
        }),
      );

      const token = data?.token as string | undefined;
      if (!token) {
        throw new Error(
          'HLTB auth data incomplete in search init response (missing token)',
        );
      }

      // Dynamically find the key/value fields
      let hpKey: string | undefined;
      let hpVal: string | undefined;

      for (const [fieldName, fieldValue] of Object.entries(data)) {
        const lower = fieldName.toLowerCase();
        if (/key/.test(lower) && typeof fieldValue === 'string') {
          hpKey = fieldValue;
        } else if (/val/.test(lower) && typeof fieldValue === 'string') {
          hpVal = fieldValue;
        }
      }

      if (!hpKey || !hpVal) {
        throw new Error(
          'HLTB auth data incomplete in search init response (missing hpKey or hpVal)',
        );
      }

      return { token, hpKey, hpVal, userAgent };
    } catch (error: unknown) {
      this.logger.error('Failed to fetch HLTB auth data', error);
      throw error;
    }
  }
}
