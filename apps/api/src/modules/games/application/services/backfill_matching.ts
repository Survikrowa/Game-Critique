import { ExternalGame } from '../../domain/models/external_game.model';
import { toSlug } from '../../domain/services/slug';

export const pickBestIgdbMatch = (
  games: ExternalGame[],
  name: string,
): ExternalGame | null => {
  const target = toSlug(name);
  return games.find((game) => toSlug(game.name) === target) ?? null;
};
