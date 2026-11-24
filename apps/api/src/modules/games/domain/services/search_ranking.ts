import { ExternalGame, ExternalGameKind } from '../models/external_game.model';
import { toSlug } from './slug';

const KIND_RANK: Record<ExternalGameKind, number> = {
  base: 0,
  edition: 1,
  dlc: 2,
  other: 3,
};

export const sortExternalGames = (
  games: ExternalGame[],
  query: string,
): ExternalGame[] => {
  const normalizedQuery = toSlug(query);
  return [...games].sort((a, b) => {
    const kindDiff = KIND_RANK[a.kind] - KIND_RANK[b.kind];
    if (kindDiff !== 0) return kindDiff;
    const aExact = toSlug(a.name) === normalizedQuery ? 0 : 1;
    const bExact = toSlug(b.name) === normalizedQuery ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return a.name.localeCompare(b.name);
  });
};
