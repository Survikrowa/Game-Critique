import { Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { IgdbService } from '../../../../infrastructure/igdb/igdb.service';
import {
  CompletionTime,
  ExternalGame,
  ExternalGameRef,
  SearchGamesInput,
  UpcomingGamesInput,
} from '../../domain/models/external_game.model';
import {
  ExternalRating,
  GameProviderPort,
} from '../../domain/ports/game_provider.port';
import { classifyGameKind } from '../../domain/services/game_kind';
import { sortExternalGames } from '../../domain/services/search_ranking';
import {
  toLocalGenreSlug,
  toLocalPlatformSlug,
} from '../mappers/taxonomy.mapper';

const IGDB_RELEASE_SIZE = 't_cover_big_2x';
const IGDB_MEDIUM_SIZE = 't_cover_big';
const IGDB_SMALL_SIZE = 't_cover_small';
const IGDB_COVER_HOST = 'https:';
const SECONDS_TO_MS = 1000;

type IgdbGame = Awaited<ReturnType<IgdbService['searchGames']>>[number];

@Injectable()
export class IgdbGameProvider implements GameProviderPort {
  readonly source = GameDataSource.IGDB;

  constructor(private readonly igdb: IgdbService) {}

  searchGames = async (input: SearchGamesInput): Promise<ExternalGame[]> => {
    const games = await this.igdb.searchGames(input.query, input.limit);
    const times = await this.igdb.getTimeToBeats(games.map((game) => game.id));
    const mapped = games.map((game) =>
      this.toExternalGame(game, times.get(game.id)),
    );
    return sortExternalGames(mapped, input.query);
  };

  getGameDetails = async (
    ref: ExternalGameRef,
  ): Promise<ExternalGame | null> => {
    const id = await this.resolveId(ref);
    if (!id) return null;
    const [game] = await this.igdb.getGamesByIds([id]);
    if (!game) return null;
    const times = await this.igdb.getTimeToBeats([id]);
    return this.toExternalGame(game, times.get(id));
  };

  getCompletionTimes = async (
    ref: ExternalGameRef,
  ): Promise<CompletionTime | null> => {
    const id = await this.resolveId(ref);
    if (!id) return null;
    const times = await this.igdb.getTimeToBeats([id]);
    return times.get(id) ?? null;
  };

  getRatings = async (ref: ExternalGameRef): Promise<ExternalRating | null> => {
    const id = await this.resolveId(ref);
    if (!id) return null;
    const ratings = await this.igdb.getGameRatings(id);
    if (!ratings) return null;
    return {
      aggregatedRating: ratings.aggregated_rating ?? null,
      aggregatedCount: ratings.aggregated_rating_count ?? null,
      rating: ratings.rating ?? null,
      ratingCount: ratings.rating_count ?? null,
      url: ratings.url ?? null,
    };
  };

  getUpcomingGames = async (
    input: UpcomingGamesInput,
  ): Promise<ExternalGame[]> => {
    const games = await this.igdb.getUpcomingGames(
      input.limit,
      input.platformIds,
    );
    return games.map((game) => this.toExternalGame(game, undefined));
  };

  private resolveId = async (ref: ExternalGameRef): Promise<number | null> => {
    if (ref.externalId) return Number(ref.externalId);
    const results = await this.igdb.searchGames(ref.name, 5);
    const exact = results.find(
      (game) => game.name.toLowerCase() === ref.name.toLowerCase(),
    );
    return exact?.id ?? results[0]?.id ?? null;
  };

  private toExternalGame = (
    game: IgdbGame,
    times: CompletionTime | undefined,
  ): ExternalGame => ({
    source: GameDataSource.IGDB,
    externalId: String(game.id),
    name: game.name,
    slug: game.slug,
    url: game.url ?? null,
    cover: game.cover
      ? {
          smallUrl: `${IGDB_COVER_HOST}${game.cover.url.replace(
            't_thumb',
            IGDB_SMALL_SIZE,
          )}`,
          mediumUrl: `${IGDB_COVER_HOST}${game.cover.url.replace(
            't_thumb',
            IGDB_MEDIUM_SIZE,
          )}`,
          bigUrl: `${IGDB_COVER_HOST}${game.cover.url.replace(
            't_thumb',
            IGDB_RELEASE_SIZE,
          )}`,
        }
      : null,
    releaseYear: game.first_release_date
      ? new Date(game.first_release_date * SECONDS_TO_MS).getUTCFullYear()
      : null,
    platforms: (game.platforms ?? []).map((platform) => ({
      sourceId: String(platform.id),
      name: platform.name,
      slug: toLocalPlatformSlug(platform.name),
    })),
    genres: (game.genres ?? []).map((genre) => ({
      sourceId: String(genre.id),
      name: genre.name,
      slug: toLocalGenreSlug(genre.name),
    })),
    completionTime: {
      main: times?.main ?? null,
      mainExtra: times?.mainExtra ?? null,
      completionist: times?.completionist ?? null,
    },
    kind: classifyGameKind({
      gameType: game.game_type ?? null,
      hasVersionParent: game.version_parent != null,
      hasParentGame: game.parent_game != null,
    }),
    parentExternalId: game.parent_game ? String(game.parent_game) : null,
  });
}
