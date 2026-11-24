import { GameDataSource } from '@prisma/client';
import { SearchService } from './search.service';

describe('SearchService', () => {
  it('searches primary provider and persists results', async () => {
    const gamesService = {
      searchGames: jest
        .fn()
        .mockResolvedValue([{ id: 7, name: 'Game', cover: null }]),
    };
    const service = new SearchService(gamesService as never);

    const result = await service.search('game');

    expect(gamesService.searchGames).toHaveBeenCalledWith('game');
    expect(result).toEqual([{ id: 7, name: 'Game', cover: null }]);
  });

  it('forces HLTB source for CSV import', async () => {
    const gamesService = {
      searchGamesWithSource: jest.fn().mockResolvedValue([]),
      upsertExternalGames: jest.fn().mockResolvedValue([]),
    };
    const service = new SearchService(gamesService as never);

    await service.searchForImport('witcher');

    expect(gamesService.searchGamesWithSource).toHaveBeenCalledWith(
      GameDataSource.HLTB,
      'witcher',
    );
  });
});
