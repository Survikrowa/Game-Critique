import { GameDataSource } from '@prisma/client';
import { ExternalGame } from '../models/external_game.model';
import { sortExternalGames } from './search_ranking';

const game = (name: string, kind: ExternalGame['kind']): ExternalGame => ({
  source: GameDataSource.IGDB,
  externalId: name,
  name,
  slug: name,
  url: null,
  cover: null,
  releaseYear: null,
  platforms: [],
  genres: [],
  completionTime: { main: null, mainExtra: null, completionist: null },
  kind,
  parentExternalId: null,
});

describe('sortExternalGames', () => {
  it('orders base, edition, dlc', () => {
    const sorted = sortExternalGames(
      [game('DLC', 'dlc'), game('Edition', 'edition'), game('Base', 'base')],
      'Base',
    );
    expect(sorted.map((entry) => entry.kind)).toEqual([
      'base',
      'edition',
      'dlc',
    ]);
  });

  it('prefers exact name within same kind', () => {
    const sorted = sortExternalGames(
      [game('Base Deluxe', 'base'), game('Base', 'base')],
      'Base',
    );
    expect(sorted[0].name).toBe('Base');
  });
});
