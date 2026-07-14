import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../../database/prisma.service';
import { DoesItPlayScraperService } from '../../infrastructure/adapters/does-it-play-scraper.service';

const BACKFILL_BATCH_SIZE = 10;
const BACKFILL_CRON = '0 3 * * *';

@Injectable()
export class BackfillDoesItPlayHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scraper: DoesItPlayScraperService,
  ) {}

  @Cron(BACKFILL_CRON)
  async backfill(): Promise<void> {
    const games = await this.prisma.game.findMany({
      where: {
        game_metadata: {
          games_physical_media: { none: {} },
        },
      },
      take: BACKFILL_BATCH_SIZE,
    });

    for (const game of games) {
      const entries = await this.scraper.fetchGameData(game.name);
      if (entries.length === 0) continue;

      const metadata = await this.prisma.game_metadata.upsert({
        where: { game_id: game.id },
        create: { game_id: game.id },
        update: {},
      });

      await this.prisma.games_physical_media.createMany({
        data: entries.map((e) => ({
          game_metadata_id: metadata.id,
          platform: e.testedOn,
          has_physical_release: e.has_physical_release,
          has_game_on_disc: e.has_game_on_disc,
        })),
      });
    }
  }
}
