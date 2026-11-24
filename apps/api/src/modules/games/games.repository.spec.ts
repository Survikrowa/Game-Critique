import { GameDataSource } from '@prisma/client';
import { GamesRepository } from './games.repository';

const tx = {
  game: { create: jest.fn(), update: jest.fn() },
  gameSourceId: { create: jest.fn() },
};

const prisma = {
  game: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn((callback: (client: typeof tx) => unknown) =>
    callback(tx),
  ),
};

const gameSourceRepository = {
  findGameId: jest.fn(),
  attach: jest.fn(),
};

const externalGame = {
  source: GameDataSource.IGDB,
  externalId: '1022',
  name: 'Game',
  slug: 'game',
  url: null,
  cover: { smallUrl: 's', mediumUrl: 'm', bigUrl: 'b' },
  releaseYear: 2015,
  platforms: [],
  genres: [],
  completionTime: { main: 1, mainExtra: 2, completionist: 3 },
  kind: 'base' as const,
  parentExternalId: null,
};

describe('GamesRepository.upsertExternalGame', () => {
  beforeEach(() => jest.clearAllMocks());

  it('creates game and source id for a new game', async () => {
    gameSourceRepository.findGameId.mockResolvedValue(null);
    tx.game.create.mockResolvedValue({ id: 7, name: 'Game' });

    const repository = new GamesRepository(
      prisma as never,
      gameSourceRepository as never,
    );
    const result = await repository.upsertExternalGame(externalGame);

    expect(result.id).toBe(7);
    expect(tx.game.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          release: { create: { date: 2015 } },
          completionTime: {
            create: { main: 1, mainExtra: 2, completionist: 3 },
          },
        }),
      }),
    );
    expect(tx.gameSourceId.create).toHaveBeenCalledWith({
      data: { gameId: 7, source: GameDataSource.IGDB, externalId: '1022' },
    });
  });

  it('updates an existing game found by source id', async () => {
    gameSourceRepository.findGameId.mockResolvedValue(7);

    const repository = new GamesRepository(
      prisma as never,
      gameSourceRepository as never,
    );
    const result = await repository.upsertExternalGame(externalGame);

    expect(result.id).toBe(7);
    expect(tx.game.create).not.toHaveBeenCalled();
  });

  it('deduplicates taxonomy slugs before creating joins', async () => {
    gameSourceRepository.findGameId.mockResolvedValue(null);
    tx.game.create.mockResolvedValue({ id: 8, name: 'Game' });

    const repository = new GamesRepository(
      prisma as never,
      gameSourceRepository as never,
    );
    await repository.upsertExternalGame({
      ...externalGame,
      platforms: [
        { sourceId: '1', name: 'PC', slug: 'pc' },
        { sourceId: '2', name: 'Windows', slug: 'pc' },
      ],
      genres: [
        { sourceId: '1', name: 'RPG', slug: 'role-playing' },
        { sourceId: '2', name: 'RPG (alt)', slug: 'role-playing' },
      ],
    });

    expect(tx.game.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          platformForGame: expect.objectContaining({
            create: [expect.anything()],
          }),
          genres: expect.objectContaining({
            create: [expect.anything()],
          }),
        }),
      }),
    );
  });

  it('attaches IGDB source to an existing HLTB game with the same name', async () => {
    gameSourceRepository.findGameId.mockResolvedValue(null);
    prisma.game.findFirst.mockResolvedValue({ id: 5, name: 'Game' });

    const repository = new GamesRepository(
      prisma as never,
      gameSourceRepository as never,
    );
    const result = await repository.upsertExternalGame(externalGame);

    expect(result.id).toBe(5);
    expect(prisma.game.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          name: { equals: 'Game', mode: 'insensitive' },
          sourceIds: {
            some: { source: GameDataSource.HLTB },
            none: { source: GameDataSource.IGDB },
          },
        }),
      }),
    );
    expect(tx.game.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 5 } }),
    );
    expect(tx.gameSourceId.create).toHaveBeenCalledWith({
      data: { gameId: 5, source: GameDataSource.IGDB, externalId: '1022' },
    });
    expect(tx.game.create).not.toHaveBeenCalled();
  });
});
