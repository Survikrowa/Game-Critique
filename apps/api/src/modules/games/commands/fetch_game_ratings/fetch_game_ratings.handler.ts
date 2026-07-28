import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FetchGameRatingsCommand } from './fetch_game_ratings.command';
import { IgdbService } from '../../../../infrastructure/igdb/igdb.service';
import { PrismaService } from '../../../database/prisma.service';
import { GamesRepository } from '../../games.repository';

@Injectable()
@CommandHandler(FetchGameRatingsCommand)
export class FetchGameRatingsHandler
  implements ICommandHandler<FetchGameRatingsCommand>
{
  private readonly logger = new Logger(FetchGameRatingsHandler.name);

  constructor(
    private readonly igdbService: IgdbService,
    private readonly prisma: PrismaService,
    private readonly gamesRepository: GamesRepository,
  ) {}

  async execute(command: FetchGameRatingsCommand): Promise<{
    aggregatedRating: number | null;
    aggregatedCount: number | null;
    igdbRating: number | null;
    igdbRatingCount: number | null;
    igdbUrl: string | null;
  }> {
    const game = await this.gamesRepository.getGameById(command.hltbId);
    if (!game) {
      throw new NotFoundException(
        `Nie znaleziono gry o HLTB ID ${command.hltbId} w bazie`,
      );
    }

    const igdbGame = await this.igdbService.searchGameByName(
      game.name,
      game.slug,
    );
    if (!igdbGame) {
      throw new NotFoundException(`Nie znaleziono gry "${game.name}" w IGDB`);
    }

    const ratings = await this.igdbService.getGameRatings(igdbGame.id);
    if (!ratings) {
      throw new InternalServerErrorException(
        `Nie udało się pobrać ocen dla "${game.name}" z IGDB`,
      );
    }

    const result = await this.prisma.$transaction((tx) =>
      tx.gameRating.upsert({
        where: { gameId: game.id },
        update: {
          igdbId: igdbGame.id,
          aggregatedRating: ratings.aggregated_rating ?? null,
          aggregatedCount: ratings.aggregated_rating_count ?? null,
          igdbRating: ratings.rating ?? null,
          igdbRatingCount: ratings.rating_count ?? null,
          igdbUrl: ratings.url || igdbGame.url || null,
        },
        create: {
          gameId: game.id,
          igdbId: igdbGame.id,
          aggregatedRating: ratings.aggregated_rating ?? null,
          aggregatedCount: ratings.aggregated_rating_count ?? null,
          igdbRating: ratings.rating ?? null,
          igdbRatingCount: ratings.rating_count ?? null,
          igdbUrl: ratings.url || igdbGame.url || null,
        },
      }),
    );

    return {
      aggregatedRating: result.aggregatedRating,
      aggregatedCount: result.aggregatedCount,
      igdbRating: result.igdbRating,
      igdbRatingCount: result.igdbRatingCount,
      igdbUrl: result.igdbUrl,
    };
  }
}
