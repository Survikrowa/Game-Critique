import { GameDataSource } from '@prisma/client';

export const GAME_SOURCE_REPOSITORY = Symbol('GAME_SOURCE_REPOSITORY');

export type GameSourceRef = {
  gameId: number;
  source: GameDataSource;
  externalId: string;
};

export type GameSourceRepositoryPort = {
  findSource(
    gameId: number,
    source: GameDataSource,
  ): Promise<GameSourceRef | null>;
  findGameId(
    source: GameDataSource,
    externalId: string,
  ): Promise<number | null>;
  attach(ref: GameSourceRef): Promise<void>;
  listGameIdsMissingSource(source: GameDataSource): Promise<number[]>;
};
