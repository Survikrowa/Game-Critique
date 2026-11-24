import { Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import {
  GameSourceRef,
  GameSourceRepositoryPort,
} from '../../domain/ports/game_source.repository.port';

@Injectable()
export class PrismaGameSourceRepository implements GameSourceRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  findSource = async (
    gameId: number,
    source: GameDataSource,
  ): Promise<GameSourceRef | null> => {
    const row = await this.prisma.gameSourceId.findUnique({
      where: { gameId_source: { gameId, source } },
    });
    return row
      ? { gameId: row.gameId, source: row.source, externalId: row.externalId }
      : null;
  };

  findGameId = async (
    source: GameDataSource,
    externalId: string,
  ): Promise<number | null> => {
    const row = await this.prisma.gameSourceId.findUnique({
      where: { source_externalId: { source, externalId } },
    });
    return row?.gameId ?? null;
  };

  attach = async (ref: GameSourceRef): Promise<void> => {
    await this.prisma.gameSourceId.upsert({
      where: {
        source_externalId: { source: ref.source, externalId: ref.externalId },
      },
      create: ref,
      update: { gameId: ref.gameId },
    });
  };

  listGameIdsMissingSource = async (
    source: GameDataSource,
  ): Promise<number[]> => {
    const rows = await this.prisma.game.findMany({
      where: { sourceIds: { none: { source } } },
      select: { id: true },
    });
    return rows.map((row) => row.id);
  };
}
