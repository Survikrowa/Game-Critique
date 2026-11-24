import { GameDataSource } from '@prisma/client';
import { GameProviderRegistryService } from './game-provider.registry';

describe('GameProviderRegistryService', () => {
  it('returns IGDB as primary and HLTB as fallback', () => {
    const igdb = { source: GameDataSource.IGDB } as never;
    const hltb = { source: GameDataSource.HLTB } as never;
    const registry = new GameProviderRegistryService(igdb, hltb);

    expect(registry.primary.source).toBe(GameDataSource.IGDB);
    expect(registry.fallback.source).toBe(GameDataSource.HLTB);
    expect(registry.bySource(GameDataSource.HLTB).source).toBe(
      GameDataSource.HLTB,
    );
  });
});
