import { NestFactory } from '@nestjs/core';
import { GameDataSource } from '@prisma/client';
import { AppModule } from '../app.module';
import { PrismaService } from '../modules/database/prisma.service';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../modules/games/domain/ports/game_provider.port';
import { pickBestIgdbMatch } from '../modules/games/application/services/backfill_matching';
import {
  BackfillUnmatched,
  formatBackfillReport,
} from '../modules/games/application/services/backfill_report';

const SEARCH_LIMIT = 5;
const PROGRESS_EVERY = 25;

const run = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const prisma = app.get(PrismaService);
  const registry = app.get<GameProviderRegistry>(GAME_PROVIDER_REGISTRY);

  const attachUnusedSource = async (
    gameId: number,
    externalId: string,
  ): Promise<boolean> => {
    const existing = await prisma.gameSourceId.findUnique({
      where: {
        source_externalId: {
          source: GameDataSource.IGDB,
          externalId,
        },
      },
    });
    if (existing) return false;

    await prisma.gameSourceId.create({
      data: {
        gameId,
        source: GameDataSource.IGDB,
        externalId,
      },
    });
    return true;
  };

  const ratedIgdbRows = await prisma.gameRating.findMany({
    select: { gameId: true, igdbId: true },
  });
  for (const row of ratedIgdbRows) {
    await attachUnusedSource(row.gameId, String(row.igdbId));
  }

  const games = await prisma.game.findMany({
    where: { sourceIds: { none: { source: GameDataSource.IGDB } } },
    select: { id: true, name: true },
  });

  let matched = 0;
  const unmatched: BackfillUnmatched[] = [];

  for (const game of games) {
    const results = await registry.primary.searchGames({
      query: game.name,
      limit: SEARCH_LIMIT,
    });
    const match = pickBestIgdbMatch(results, game.name);
    if (!match) {
      unmatched.push({
        id: game.id,
        name: game.name,
        reason: 'no_exact_match',
      });
      continue;
    }

    const attached = await attachUnusedSource(game.id, match.externalId);
    if (!attached) {
      unmatched.push({
        id: game.id,
        name: game.name,
        reason: 'external_id_taken',
        externalId: match.externalId,
      });
      continue;
    }

    matched += 1;
    if (matched % PROGRESS_EVERY === 0) {
      console.log(JSON.stringify({ processed: matched, total: games.length }));
    }
  }

  console.log(
    formatBackfillReport({
      total: games.length,
      matched,
      unmatched,
    }),
  );
  console.log(
    JSON.stringify({
      total: games.length,
      matched,
      unmatched: unmatched.length,
    }),
  );
  await app.close();
};

run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
