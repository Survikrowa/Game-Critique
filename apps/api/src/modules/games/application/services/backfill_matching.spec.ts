import { GameDataSource } from '@prisma/client';
import { ExternalGame } from '../../domain/models/external_game.model';
import { pickBestIgdbMatch } from './backfill_matching';

const game = (name: string): ExternalGame => ({
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
  kind: 'base',
  parentExternalId: null,
});

describe('pickBestIgdbMatch', () => {
  it('prefers exact base game', () => {
    const match = pickBestIgdbMatch(
      [game('The Witcher 3: Wild Hunt'), game('The Witcher 3')],
      'The Witcher 3: Wild Hunt',
    );
    expect(match?.name).toBe('The Witcher 3: Wild Hunt');
  });

  it('returns null when no exact match', () => {
    expect(pickBestIgdbMatch([game('Other')], 'The Witcher 3')).toBeNull();
  });
});
