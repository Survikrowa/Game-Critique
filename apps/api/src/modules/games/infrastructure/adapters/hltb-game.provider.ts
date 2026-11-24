import { Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { HowLongToBeatParserFacade } from '../../../howlongtobeat_parser/howlongtobeat_parser.facade';
import {
  CompletionTime,
  ExternalGame,
  ExternalGameRef,
  SearchGamesInput,
} from '../../domain/models/external_game.model';
import { GameProviderPort } from '../../domain/ports/game_provider.port';
import {
  toLocalGenreSlug,
  toLocalPlatformSlug,
} from '../mappers/taxonomy.mapper';
import { toSlug } from '../../domain/services/slug';

type HltbFacadeGame = Awaited<
  ReturnType<HowLongToBeatParserFacade['fetchGames']>
>[number];

const HLTB_GAME_URL = 'https://howlongtobeat.com/game?id=';

@Injectable()
export class HltbGameProvider implements GameProviderPort {
  readonly source = GameDataSource.HLTB;

  constructor(private readonly facade: HowLongToBeatParserFacade) {}

  searchGames = async (input: SearchGamesInput): Promise<ExternalGame[]> => {
    const results = await this.facade.fetchGames(input.query);
    return results.map(this.toExternalGame);
  };

  getGameDetails = async (
    ref: ExternalGameRef,
  ): Promise<ExternalGame | null> => {
    const results = await this.facade.fetchGames(ref.name);
    const match = ref.externalId
      ? results.find((game) => String(game.id) === ref.externalId)
      : results[0];
    return match ? this.toExternalGame(match) : null;
  };

  getCompletionTimes = async (
    ref: ExternalGameRef,
  ): Promise<CompletionTime | null> => {
    const game = await this.getGameDetails(ref);
    return game?.completionTime ?? null;
  };

  getRatings = async (): Promise<null> => null;

  getUpcomingGames = async (): Promise<ExternalGame[]> => [];

  private toExternalGame = (game: HltbFacadeGame): ExternalGame => ({
    source: GameDataSource.HLTB,
    externalId: String(game.id),
    name: game.name,
    slug: toSlug(game.name),
    url: `${HLTB_GAME_URL}${game.id}`,
    cover: {
      smallUrl: game.coverSmallUrl,
      mediumUrl: game.coverMediumUrl,
      bigUrl: game.coverBigUrl,
    },
    releaseYear: game.firstReleaseDate || null,
    platforms: game.platforms.map((platform) => ({
      sourceId: null,
      name: platform.name,
      slug: toLocalPlatformSlug(platform.name),
    })),
    genres: game.genres.map((genre) => ({
      sourceId: null,
      name: genre.name,
      slug: toLocalGenreSlug(genre.name),
    })),
    completionTime: {
      main: game.completionTime.mainStory,
      mainExtra: game.completionTime.mainExtra,
      completionist: game.completionTime.completionist,
    },
    kind: 'base',
    parentExternalId: null,
  });
}
