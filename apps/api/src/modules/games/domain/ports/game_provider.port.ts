import { GameDataSource } from '@prisma/client';
import {
  CompletionTime,
  ExternalGame,
  ExternalGameRef,
  SearchGamesInput,
  UpcomingGamesInput,
} from '../models/external_game.model';

export const IGDB_GAME_PROVIDER = Symbol('IGDB_GAME_PROVIDER');
export const HLTB_GAME_PROVIDER = Symbol('HLTB_GAME_PROVIDER');
export const GAME_PROVIDER_REGISTRY = Symbol('GAME_PROVIDER_REGISTRY');

export type ExternalRating = {
  aggregatedRating: number | null;
  aggregatedCount: number | null;
  rating: number | null;
  ratingCount: number | null;
  url: string | null;
};

export type GameProviderPort = {
  readonly source: GameDataSource;
  searchGames(input: SearchGamesInput): Promise<ExternalGame[]>;
  getGameDetails(ref: ExternalGameRef): Promise<ExternalGame | null>;
  getCompletionTimes(ref: ExternalGameRef): Promise<CompletionTime | null>;
  getRatings(ref: ExternalGameRef): Promise<ExternalRating | null>;
  getUpcomingGames(input: UpcomingGamesInput): Promise<ExternalGame[]>;
};

export type GameProviderRegistry = {
  primary: GameProviderPort;
  fallback: GameProviderPort;
  bySource: (source: GameDataSource) => GameProviderPort;
};
