import { Logger } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { GamesService } from './games.service';
import { ExternalGame } from './domain/models/external_game.model';

const game = (externalId: string): ExternalGame => ({
  source: GameDataSource.IGDB,
  externalId,
  name: `Game ${externalId}`,
  slug: `game-${externalId}`,
  url: null,
  cover: null,
  releaseYear: null,
  platforms: [],
  genres: [],
  completionTime: { main: null, mainExtra: null, completionist: null },
  kind: 'base',
  parentExternalId: null,
});

describe('GamesService.upsertExternalGames', () => {
  afterEach(() => jest.restoreAllMocks());

  it('returns successfully persisted games when one upsert fails', async () => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
    const repository = {
      upsertExternalGame: jest
        .fn()
        .mockResolvedValueOnce({ id: 1, name: 'Game 1', cover: null })
        .mockRejectedValueOnce(new Error('boom')),
    };
    const service = new GamesService(
      repository as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );

    const result = await service.upsertExternalGames([game('1'), game('2')]);

    expect(result).toEqual([{ id: 1, name: 'Game 1', cover: null }]);
    expect(Logger.prototype.error).toHaveBeenCalled();
  });
});
