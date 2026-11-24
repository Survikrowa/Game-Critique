import { NestFactory } from '@nestjs/core';
import { GameDataSource } from '@prisma/client';
import { AppModule } from '../app.module';
import { PrismaService } from '../modules/database/prisma.service';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../modules/games/domain/ports/game_provider.port';

const DEFAULT_LIMIT = 100;
const ARG_LIMIT = '--limit';
const EMPTY_TIME = 0;

const readLimit = (): number => {
  const index = process.argv.indexOf(ARG_LIMIT);
  if (index === -1) return DEFAULT_LIMIT;
  const value = Number(process.argv[index + 1]);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_LIMIT;
};

const hasTime = (value: number | null): boolean =>
  value !== null && value > EMPTY_TIME;

const run = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const prisma = app.get(PrismaService);
  const registry = app.get<GameProviderRegistry>(GAME_PROVIDER_REGISTRY);

  const games = await prisma.game.findMany({
    take: readLimit(),
    select: { id: true, name: true, sourceIds: true },
  });

  let withAny = 0;
  let withAll = 0;
  let hastily = 0;
  let normally = 0;
  let completely = 0;

  for (const game of games) {
    const source = game.sourceIds.find(
      (entry) => entry.source === GameDataSource.IGDB,
    );
    const time = await registry.primary.getCompletionTimes({
      source: GameDataSource.IGDB,
      externalId: source?.externalId ?? null,
      name: game.name,
    });
    if (!time) continue;

    const values = [time.main, time.mainExtra, time.completionist];
    if (values.some(hasTime)) withAny += 1;
    if (values.every(hasTime)) withAll += 1;
    if (hasTime(time.main)) hastily += 1;
    if (hasTime(time.mainExtra)) normally += 1;
    if (hasTime(time.completionist)) completely += 1;
  }

  console.log(
    JSON.stringify({
      total: games.length,
      withAny,
      withAll,
      byField: { hastily, normally, completely },
    }),
  );
  await app.close();
};

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
