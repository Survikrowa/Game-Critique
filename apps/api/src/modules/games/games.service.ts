import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ExternalGame,
  PersistedGameSummary,
} from './domain/models/external_game.model';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from './domain/ports/game_provider.port';
import { GamesRepository } from './games.repository';
import { GameWithAllDataDTO } from './games.dto';
import { GetGamesQuery } from './queries/get_games/get_games.query';
import { UpdateGameDataCommand } from './commands/update_game_data/update_game_data.command';
import { CompletionTimeFallbackService } from './application/services/completion_time_fallback.service';

const SEARCH_LIMIT = 20;
const PRIMARY_SOURCE = GameDataSource.IGDB;

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(GAME_PROVIDER_REGISTRY)
    private readonly registry: GameProviderRegistry,
    private readonly completionTimeFallback: CompletionTimeFallbackService,
  ) {}

  async searchGamesWithSource(
    source: GameDataSource,
    input: string,
  ): Promise<ExternalGame[]> {
    return this.registry.bySource(source).searchGames({
      query: input,
      limit: SEARCH_LIMIT,
    });
  }

  async searchGames(input: string): Promise<PersistedGameSummary[]> {
    const games = await this.searchGamesWithSource(PRIMARY_SOURCE, input);
    return this.upsertExternalGames(games);
  }

  async upsertExternalGames(
    games: ExternalGame[],
  ): Promise<PersistedGameSummary[]> {
    const results = await Promise.allSettled(
      games.map((game) => this.gamesRepository.upsertExternalGame(game)),
    );
    const persisted: PersistedGameSummary[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        persisted.push(result.value);
        return;
      }
      const game = games[index];
      this.logger.error(
        `Failed to persist searched game ${game.externalId}`,
        result.reason,
      );
    });

    return persisted;
  }

  async getGameById(gameId: number): Promise<GameWithAllDataDTO> {
    const game = await this.gamesRepository.getGameById(gameId);
    if (!game) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Nie znaleziono gry o podanym ID',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const resolvedCompletionTime = await this.completionTimeFallback.resolve({
      gameId: game.id,
      name: game.name,
      completionTime: game.completionTime,
      sources: game.sourceIds,
    });

    const {
      cover,
      platformForGame,
      genres,
      release,
      game_metadata,
      gameRating,
      ...baseGame
    } = game;

    return {
      ...baseGame,
      cover: cover,
      platforms: platformForGame.map(({ platform }) => platform),
      releases: release,
      genres: genres.map(({ genre }) => genre),
      completionTime: {
        main: resolvedCompletionTime?.main ?? game.completionTime?.main ?? 0,
        mainExtra:
          resolvedCompletionTime?.mainExtra ??
          game.completionTime?.mainExtra ??
          0,
        completionist:
          resolvedCompletionTime?.completionist ??
          game.completionTime?.completionist ??
          0,
      },
      gameMetadata: game_metadata
        ? {
            physicalMedia: game_metadata.games_physical_media?.length
              ? game_metadata.games_physical_media.map((entry) => ({
                  platform: entry.platform,
                  hasPhysicalRelease: entry.has_physical_release,
                  hasGameOnDisc: entry.has_game_on_disc,
                }))
              : [],
          }
        : null,
      gameRating: gameRating
        ? {
            aggregatedRating: gameRating.aggregatedRating,
            aggregatedCount: gameRating.aggregatedCount,
            igdbRating: gameRating.igdbRating,
            igdbRatingCount: gameRating.igdbRatingCount,
            igdbUrl: gameRating.igdbUrl,
          }
        : null,
    };
  }

  async getPaginatedGames({
    skip,
    take,
    search,
  }: GetPaginatedGamesArgs): Promise<GetPaginatedGamesResponse> {
    const games = await this.queryBus.execute(
      new GetGamesQuery(search, take, skip),
    );

    return {
      items: games,
      pagination: {
        skip: skip ?? 0,
        take: take ?? 10,
        total: games.length,
        hasMore: games.length === (take ?? 10),
        hasPrevious: (skip && skip > 0) || false,
      },
    };
  }

  async findGameByName(name: string) {
    return this.gamesRepository.getGameByName(name);
  }

  async updateGameData(gameId: number): Promise<UpdateGameDataResponse> {
    const gameDetails = await this.commandBus.execute(
      new UpdateGameDataCommand(gameId),
    );

    if (!gameDetails) {
      return {
        gameId,
        message: 'Could not update game data.',
      };
    }
    return {
      gameId: gameDetails.gameId,
      message: `Game data for game ID ${gameDetails.gameId} has been successfully updated.`,
    };
  }
}

type UpdateGameDataResponse = {
  gameId: number;
  message: string;
};

type GetPaginatedGamesArgs = {
  search: string | null;
  take: number | undefined;
  skip: number | undefined;
};

type Game = {
  id: number;
  name: string;
  slug: string;
};

type GetPaginatedGamesResponse = {
  items: Game[];
  pagination: {
    skip: number;
    take: number;
    total: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
};
