import { GameDataSource } from '@prisma/client';

export type ExternalTaxonomy = {
  sourceId: string | null;
  name: string;
  slug: string;
};

export type CompletionTime = {
  main: number | null;
  mainExtra: number | null;
  completionist: number | null;
};

export type ExternalGameKind = 'base' | 'edition' | 'dlc' | 'other';

export type ExternalGame = {
  source: GameDataSource;
  externalId: string;
  name: string;
  slug: string;
  url: string | null;
  cover: {
    smallUrl: string;
    mediumUrl: string;
    bigUrl: string;
  } | null;
  releaseYear: number | null;
  platforms: ExternalTaxonomy[];
  genres: ExternalTaxonomy[];
  completionTime: CompletionTime;
  kind: ExternalGameKind;
  parentExternalId: string | null;
};

export type ExternalGameRef = {
  source: GameDataSource;
  externalId: string | null;
  name: string;
};

export type SearchGamesInput = {
  query: string;
  limit: number;
};

export type UpcomingGamesInput = {
  limit: number;
  platformIds: number[];
};

export type PersistedGameSummary = {
  id: number;
  name: string;
  cover: {
    smallUrl: string;
    mediumUrl: string;
    bigUrl: string;
  } | null;
};
