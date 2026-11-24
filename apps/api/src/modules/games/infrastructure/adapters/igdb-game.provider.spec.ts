import { GameDataSource } from '@prisma/client';
import { IgdbGameProvider } from './igdb-game.provider';

const igdb = {
  searchGames: jest.fn().mockResolvedValue([
    {
      id: 1022,
      name: 'The Witcher 3: Wild Hunt',
      slug: 'the-witcher-3-wild-hunt',
      url: 'https://www.igdb.com/games/the-witcher-3-wild-hunt',
      cover: {
        id: 1,
        url: '//images.igdb.com/igdb/image/upload/t_thumb/cover.jpg',
      },
      first_release_date: 1431993600,
      platforms: [{ id: 6, name: 'PC (Microsoft Windows)', slug: 'win' }],
      genres: [{ id: 12, name: 'Role-playing (RPG)', slug: 'role-playing' }],
      game_type: 0,
    },
  ]),
  getTimeToBeats: jest
    .fn()
    .mockResolvedValue(
      new Map([[1022, { main: 100, mainExtra: 200, completionist: 300 }]]),
    ),
};

describe('IgdbGameProvider', () => {
  it('maps IGDB response to neutral ExternalGame', async () => {
    const provider = new IgdbGameProvider(igdb as never);
    const [game] = await provider.searchGames({
      query: 'witcher',
      limit: 20,
    });

    expect(game.source).toBe(GameDataSource.IGDB);
    expect(game.externalId).toBe('1022');
    expect(game.releaseYear).toBe(2015);
    expect(game.kind).toBe('base');
    expect(game.platforms[0].slug).toBe('pc');
    expect(game.genres[0].slug).toBe('role-playing');
    expect(game.completionTime.completionist).toBe(300);
    expect(game.cover?.bigUrl).toContain('t_cover_big_2x');
  });

  it('sorts base before edition before dlc', async () => {
    igdb.searchGames.mockResolvedValue([
      { id: 3, name: 'DLC', slug: 'dlc', game_type: 1, parent_game: 1 },
      { id: 2, name: 'Edition', slug: 'edition', game_type: 9 },
      { id: 1, name: 'Base', slug: 'base', game_type: 0 },
    ]);
    igdb.getTimeToBeats.mockResolvedValue(new Map());

    const provider = new IgdbGameProvider(igdb as never);
    const games = await provider.searchGames({ query: 'base', limit: 20 });

    expect(games.map((game) => game.kind)).toEqual(['base', 'edition', 'dlc']);
  });
});
