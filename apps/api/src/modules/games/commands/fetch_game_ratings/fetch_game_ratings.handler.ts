import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { FetchGameRatingsCommand } from './fetch_game_ratings.command';
import { PrismaService } from '../../../database/prisma.service';
import { GamesRepository } from '../../games.repository';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../../domain/ports/game_provider.port';
import {
  GAME_SOURCE_REPOSITORY,
  GameSourceRepositoryPort,
} from '../../domain/ports/game_source.repository.port';

const SEARCH_LIMIT = 5;

@Injectable()
@CommandHandler(FetchGameRatingsCommand)
export class FetchGameRatingsHandler
  implements ICommandHandler<FetchGameRatingsCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly gamesRepository: GamesRepository,
    @Inject(GAME_PROVIDER_REGISTRY)
    private readonly registry: GameProviderRegistry,
    @Inject(GAME_SOURCE_REPOSITORY)
    private readonly sourceRepository: GameSourceRepositoryPort,
  ) {}

  async execute(command: FetchGameRatingsCommand): Promise<{
    aggregatedRating: number | null;
    aggregatedCount: number | null;
    igdbRating: number | null;
    igdbRatingCount: number | null;
    igdbUrl: string | null;
  }> {
    const game = await this.gamesRepository.getGameById(command.gameId);
    if (!game) {
      throw new NotFoundException(
        `Nie znaleziono gry o ID ${command.gameId} w bazie`,
      );
    }

    const externalId = await this.resolveIgdbId(game, command.gameId);
    const ratings = await this.registry.primary.getRatings({
      source: GameDataSource.IGDB,
      externalId,
      name: game.name,
    });
    if (!ratings) {
      throw new InternalServerErrorException(
        `Nie udało się pobrać ocen dla "${game.name}" z IGDB`,
      );
    }

    const result = await this.prisma.gameRating.upsert({
      where: { gameId: game.id },
      update: {
        igdbId: Number(externalId),
        aggregatedRating: ratings.aggregatedRating ?? null,
        aggregatedCount: ratings.aggregatedCount ?? null,
        igdbRating: ratings.rating ?? null,
        igdbRatingCount: ratings.ratingCount ?? null,
        igdbUrl: ratings.url || null,
      },
      create: {
        gameId: game.id,
        igdbId: Number(externalId),
        aggregatedRating: ratings.aggregatedRating ?? null,
        aggregatedCount: ratings.aggregatedCount ?? null,
        igdbRating: ratings.rating ?? null,
        igdbRatingCount: ratings.ratingCount ?? null,
        igdbUrl: ratings.url || null,
      },
    });

    return {
      aggregatedRating: result.aggregatedRating,
      aggregatedCount: result.aggregatedCount,
      igdbRating: result.igdbRating,
      igdbRatingCount: result.igdbRatingCount,
      igdbUrl: result.igdbUrl,
    };
  }

  private async resolveIgdbId(
    game: {
      name: string;
      sourceIds: { source: GameDataSource; externalId: string }[];
    },
    gameId: number,
  ): Promise<string> {
    const existing = game.sourceIds.find(
      (source) => source.source === GameDataSource.IGDB,
    );
    if (existing) return existing.externalId;

    const candidates = await this.registry.primary.searchGames({
      query: game.name,
      limit: SEARCH_LIMIT,
    });
    const match =
      candidates.find((candidate) => candidate.kind === 'base') ??
      candidates[0];
    if (!match) {
      throw new NotFoundException(`Nie znaleziono gry "${game.name}" w IGDB`);
    }

    await this.sourceRepository.attach({
      gameId,
      source: GameDataSource.IGDB,
      externalId: match.externalId,
    });
    return match.externalId;
  }
}
