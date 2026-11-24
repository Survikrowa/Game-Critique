import { GameDataSource } from '@prisma/client';
import { UpdateGameDataHandler } from './update_game_data.handler';
import { UpdateGameDataCommand } from './update_game_data.command';

type PrismaMock = {
  game: { update: jest.Mock };
  $transaction: jest.Mock;
};

const prisma: PrismaMock = {
  game: { update: jest.fn().mockResolvedValue({ id: 7 }) },
  $transaction: jest.fn((callback: (tx: PrismaMock) => unknown) =>
    callback(prisma),
  ),
};
const gamesRepository = {
  getGameById: jest.fn().mockResolvedValue({
    id: 7,
    name: 'Game',
    sourceIds: [{ source: GameDataSource.IGDB, externalId: '1022' }],
    platformForGame: [],
    genres: [],
    completionTime: null,
  }),
};
const registry = {
  primary: {
    getGameDetails: jest.fn().mockResolvedValue({
      platforms: [{ name: 'PC', slug: 'pc' }],
      genres: [],
      completionTime: { main: 1, mainExtra: 2, completionist: 3 },
    }),
  },
};

describe('UpdateGameDataHandler', () => {
  beforeEach(() => jest.clearAllMocks());

  it('uses database game id in platform composite key', async () => {
    const handler = new UpdateGameDataHandler(
      prisma as never,
      gamesRepository as never,
      registry as never,
    );

    const result = await handler.execute(new UpdateGameDataCommand(7));

    expect(result).toEqual({ gameId: 7 });
    expect(prisma.game.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 7 },
        data: expect.objectContaining({
          platformForGame: expect.objectContaining({
            create: [
              expect.objectContaining({
                platform: {
                  connectOrCreate: {
                    where: { slug: 'pc' },
                    create: { name: 'PC', slug: 'pc' },
                  },
                },
              }),
            ],
          }),
        }),
      }),
    );
  });
});
