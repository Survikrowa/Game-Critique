import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export const DEFAULT_PLATFORM_IDS = [48, 167, 49, 169, 130, 6, 508];

@Injectable()
export class UpcomingGamesPreferencesFacade {
  constructor(private readonly prisma: PrismaService) {}

  async resolvePlatformIds(oauthId?: string): Promise<number[]> {
    if (!oauthId) return DEFAULT_PLATFORM_IDS;
    const settings = await this.prisma.userSettings.findUnique({
      where: { oauthId },
    });
    const stored = settings?.platformIds
      ?.split(',')
      .filter(Boolean)
      .map(Number);
    if (!stored || stored.length === 0) return DEFAULT_PLATFORM_IDS;
    return stored;
  }
}
