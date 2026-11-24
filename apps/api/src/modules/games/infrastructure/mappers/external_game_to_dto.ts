import { ExternalGame } from '../../domain/models/external_game.model';
import { ExternalGameDTO } from '../../games.dto';

export const toExternalGameDto = (game: ExternalGame): ExternalGameDTO => ({
  id: game.externalId,
  name: game.name,
  url: game.url ?? undefined,
  coverUrl: game.cover?.bigUrl,
  backgroundUrl: undefined,
  releaseDate: game.releaseYear
    ? new Date(`${game.releaseYear}-01-01T00:00:00.000Z`)
    : new Date(0),
  platforms: game.platforms.map((platform) => ({
    id: platform.sourceId ?? '',
    name: platform.name,
  })),
});
