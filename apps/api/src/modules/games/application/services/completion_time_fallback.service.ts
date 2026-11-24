import { Inject, Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { CompletionTime } from '../../domain/models/external_game.model';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../../domain/ports/game_provider.port';

const EMPTY_TIME = 0;

const hasAnyTime = (time: CompletionTime | null): time is CompletionTime =>
  !!time &&
  ((time.main ?? EMPTY_TIME) > EMPTY_TIME ||
    (time.mainExtra ?? EMPTY_TIME) > EMPTY_TIME ||
    (time.completionist ?? EMPTY_TIME) > EMPTY_TIME);

@Injectable()
export class CompletionTimeFallbackService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(GAME_PROVIDER_REGISTRY)
    private readonly registry: GameProviderRegistry,
  ) {}

  resolve = async (input: {
    gameId: number;
    name: string;
    completionTime: CompletionTime | null;
    sources: { source: GameDataSource; externalId: string }[];
  }): Promise<CompletionTime | null> => {
    if (hasAnyTime(input.completionTime)) return input.completionTime;

    const igdbSource = input.sources.find(
      (source) => source.source === GameDataSource.IGDB,
    );
    const igdbTime = await this.registry
      .bySource(GameDataSource.IGDB)
      .getCompletionTimes({
        source: GameDataSource.IGDB,
        externalId: igdbSource?.externalId ?? null,
        name: input.name,
      });
    if (hasAnyTime(igdbTime)) return this.save(input.gameId, igdbTime);

    const hltbSource = input.sources.find(
      (source) => source.source === GameDataSource.HLTB,
    );
    const hltbTime = await this.registry
      .bySource(GameDataSource.HLTB)
      .getCompletionTimes({
        source: GameDataSource.HLTB,
        externalId: hltbSource?.externalId ?? null,
        name: input.name,
      });
    if (!hasAnyTime(hltbTime)) return input.completionTime;

    return this.save(input.gameId, hltbTime);
  };

  private save = async (
    gameId: number,
    time: CompletionTime,
  ): Promise<CompletionTime> => {
    await this.prisma.gameCompletionTime.upsert({
      where: { gameId },
      update: {
        main: time.main ?? EMPTY_TIME,
        mainExtra: time.mainExtra ?? EMPTY_TIME,
        completionist: time.completionist ?? EMPTY_TIME,
      },
      create: {
        gameId,
        main: time.main ?? EMPTY_TIME,
        mainExtra: time.mainExtra ?? EMPTY_TIME,
        completionist: time.completionist ?? EMPTY_TIME,
      },
    });
    return time;
  };
}
