import { Inject, Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import {
  HLTB_GAME_PROVIDER,
  IGDB_GAME_PROVIDER,
  GameProviderPort,
  GameProviderRegistry,
} from '../../domain/ports/game_provider.port';

@Injectable()
export class GameProviderRegistryService implements GameProviderRegistry {
  constructor(
    @Inject(IGDB_GAME_PROVIDER) private readonly igdb: GameProviderPort,
    @Inject(HLTB_GAME_PROVIDER) private readonly hltb: GameProviderPort,
  ) {}

  get primary(): GameProviderPort {
    return this.igdb;
  }

  get fallback(): GameProviderPort {
    return this.hltb;
  }

  bySource = (source: GameDataSource): GameProviderPort =>
    source === GameDataSource.IGDB ? this.igdb : this.hltb;
}
