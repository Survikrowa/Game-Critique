import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { GameReminderRepositoryPort } from '../../domain/ports/game_reminder.repository.port';
import { GameReminder } from '../../domain/models/game_reminder.model';

@Injectable()
export class PrismaGameReminderRepository
  implements GameReminderRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: GameReminder): Promise<GameReminder> {
    const saved = await this.prisma.gameReminder.create({
      data: {
        oauthId: entity.oauthId,
        igdbId: entity.igdbId,
        gameName: entity.gameName,
        gameUrl: entity.gameUrl,
        releaseDate: entity.releaseDate,
        coverUrl: entity.coverUrl ?? null,
        notifiedOneWeek: entity.notifiedOneWeek,
        notifiedReleaseDay: entity.notifiedReleaseDay,
      },
    });
    return GameReminder.create(
      {
        oauthId: saved.oauthId,
        igdbId: saved.igdbId,
        gameName: saved.gameName,
        gameUrl: saved.gameUrl,
        releaseDate: saved.releaseDate,
        coverUrl: saved.coverUrl,
        notifiedOneWeek: saved.notifiedOneWeek,
        notifiedReleaseDay: saved.notifiedReleaseDay,
        createdAt: saved.createdAt,
      },
      saved.id,
    );
  }

  async findByOauthId(oauthId: string): Promise<GameReminder[]> {
    const records = await this.prisma.gameReminder.findMany({
      where: { oauthId },
      orderBy: { releaseDate: 'asc' },
    });
    return records.map((r) =>
      GameReminder.create(
        {
          oauthId: r.oauthId,
          igdbId: r.igdbId,
          gameName: r.gameName,
          gameUrl: r.gameUrl,
          releaseDate: r.releaseDate,
          coverUrl: r.coverUrl,
          notifiedOneWeek: r.notifiedOneWeek,
          notifiedReleaseDay: r.notifiedReleaseDay,
          createdAt: r.createdAt,
        },
        r.id,
      ),
    );
  }

  async findByOauthIdAndIgdbId(
    oauthId: string,
    igdbId: number,
  ): Promise<GameReminder | null> {
    const record = await this.prisma.gameReminder.findUnique({
      where: { oauthId_igdbId: { oauthId, igdbId } },
    });
    if (!record) return null;
    return GameReminder.create(
      {
        oauthId: record.oauthId,
        igdbId: record.igdbId,
        gameName: record.gameName,
        gameUrl: record.gameUrl,
        releaseDate: record.releaseDate,
        coverUrl: record.coverUrl,
        notifiedOneWeek: record.notifiedOneWeek,
        notifiedReleaseDay: record.notifiedReleaseDay,
        createdAt: record.createdAt,
      },
      record.id,
    );
  }

  async findByDateRange(start: Date, end: Date): Promise<GameReminder[]> {
    const records = await this.prisma.gameReminder.findMany({
      where: { releaseDate: { gte: start, lt: end } },
    });
    return records.map((r) =>
      GameReminder.create(
        {
          oauthId: r.oauthId,
          igdbId: r.igdbId,
          gameName: r.gameName,
          gameUrl: r.gameUrl,
          releaseDate: r.releaseDate,
          coverUrl: r.coverUrl,
          notifiedOneWeek: r.notifiedOneWeek,
          notifiedReleaseDay: r.notifiedReleaseDay,
          createdAt: r.createdAt,
        },
        r.id,
      ),
    );
  }

  async update(
    id: number,
    data: Partial<{
      notifiedOneWeek: boolean;
      notifiedReleaseDay: boolean;
    }>,
  ): Promise<void> {
    await this.prisma.gameReminder.update({ where: { id }, data });
  }

  async deleteByOauthIdAndIgdbId(
    oauthId: string,
    igdbId: number,
  ): Promise<void> {
    await this.prisma.gameReminder.delete({
      where: { oauthId_igdbId: { oauthId, igdbId } },
    });
  }
}
