import { GameDataSource } from '@prisma/client';
import { PrismaGameSourceRepository } from './prisma-game-source.repository';

const prisma = {
  gameSourceId: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
  game: { findMany: jest.fn() },
};

describe('PrismaGameSourceRepository', () => {
  const repository = new PrismaGameSourceRepository(prisma as never);

  beforeEach(() => jest.clearAllMocks());

  it('finds game id by source and external id', async () => {
    prisma.gameSourceId.findUnique.mockResolvedValue({ gameId: 42 });
    const gameId = await repository.findGameId(GameDataSource.IGDB, '1022');
    expect(gameId).toBe(42);
    expect(prisma.gameSourceId.findUnique).toHaveBeenCalledWith({
      where: {
        source_externalId: {
          source: GameDataSource.IGDB,
          externalId: '1022',
        },
      },
    });
  });

  it('attaches source id idempotently', async () => {
    await repository.attach({
      gameId: 42,
      source: GameDataSource.IGDB,
      externalId: '1022',
    });
    expect(prisma.gameSourceId.upsert).toHaveBeenCalledWith({
      where: {
        source_externalId: {
          source: GameDataSource.IGDB,
          externalId: '1022',
        },
      },
      create: {
        gameId: 42,
        source: GameDataSource.IGDB,
        externalId: '1022',
      },
      update: { gameId: 42 },
    });
  });
});
