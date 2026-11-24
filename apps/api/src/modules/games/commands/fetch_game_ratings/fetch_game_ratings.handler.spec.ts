import { GameDataSource } from '@prisma/client';
import { FetchGameRatingsHandler } from './fetch_game_ratings.handler';
import { FetchGameRatingsCommand } from './fetch_game_ratings.command';

const prisma = {
  gameRating: {
    upsert: jest.fn().mockResolvedValue({
      aggregatedRating: 90,
      aggregatedCount: 10,
      igdbRating: 8.5,
      igdbRatingCount: 20,
      igdbUrl: 'https://igdb.com/game',
    }),
  },
};
const gamesRepository = {
  getGameById: jest.fn(),
};
const registry = {
  primary: {
    getRatings: jest.fn().mockResolvedValue({
      aggregatedRating: 90,
      aggregatedCount: 10,
      rating: 8.5,
      ratingCount: 20,
      url: 'https://igdb.com/game',
    }),
    searchGames: jest.fn().mockResolvedValue([]),
  },
};
const sourceRepository = { attach: jest.fn() };

describe('FetchGameRatingsHandler', () => {
  beforeEach(() => jest.clearAllMocks());

  it('uses stored IGDB source id and stores ratings', async () => {
    gamesRepository.getGameById.mockResolvedValue({
      id: 7,
      name: 'Game',
      sourceIds: [{ source: GameDataSource.IGDB, externalId: '1022' }],
    });

    const handler = new FetchGameRatingsHandler(
      prisma as never,
      gamesRepository as never,
      registry as never,
      sourceRepository as never,
    );

    const result = await handler.execute(new FetchGameRatingsCommand(7));

    expect(gamesRepository.getGameById).toHaveBeenCalledWith(7);
    expect(registry.primary.getRatings).toHaveBeenCalledWith({
      source: GameDataSource.IGDB,
      externalId: '1022',
      name: 'Game',
    });
    expect(prisma.gameRating.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { gameId: 7 },
        create: expect.objectContaining({ igdbId: 1022 }),
      }),
    );
    expect(result.aggregatedRating).toBe(90);
  });

  it('attaches IGDB source when the game has none', async () => {
    gamesRepository.getGameById.mockResolvedValue({
      id: 7,
      name: 'Game',
      sourceIds: [],
    });
    registry.primary.searchGames.mockResolvedValue([
      { kind: 'edition', externalId: '1' },
      { kind: 'base', externalId: '2' },
    ]);

    const handler = new FetchGameRatingsHandler(
      prisma as never,
      gamesRepository as never,
      registry as never,
      sourceRepository as never,
    );

    await handler.execute(new FetchGameRatingsCommand(7));

    expect(sourceRepository.attach).toHaveBeenCalledWith({
      gameId: 7,
      source: GameDataSource.IGDB,
      externalId: '2',
    });
  });
});
