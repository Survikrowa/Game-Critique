import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from './games.service';
import {
  ExternalGameDTO,
  GameWithAllDataDTO,
  GetPaginatedGamesArgs,
  PaginatedGamesDTO,
  UpdateGameDataDTO,
  GameRatingObject,
} from './games.dto';
import { UseGuards } from '@nestjs/common';
import { AdminUserGuard } from '../auth/infrastructure/guards/admin-user.guard';
import { JwtAuthGuard } from '../auth/infrastructure/guards/auth-jwt.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUpcomingGamesQuery } from './queries/get_upcoming_games/get_upcoming_games.query';
import { User } from '../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../auth/infrastructure/graphql/auth.dto';
import { FetchGameRatingsCommand } from './commands/fetch_game_ratings/fetch_game_ratings.command';

@Resolver()
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => GameWithAllDataDTO, { name: 'game' })
  async getGameById(@Args('hltbId') hltbId: number) {
    return this.gamesService.getGameById(hltbId);
  }

  @Query(() => PaginatedGamesDTO, { name: 'games' })
  async getGames(
    @Args() { search, take, skip }: GetPaginatedGamesArgs,
  ): Promise<PaginatedGamesDTO> {
    return this.gamesService.getPaginatedGames({
      search,
      take,
      skip,
    });
  }

  @UseGuards(JwtAuthGuard, AdminUserGuard)
  @Mutation(() => UpdateGameDataDTO, { name: 'updateGameData' })
  async updateGameData(
    @Args('hltbId') hltbId: number,
  ): Promise<UpdateGameDataDTO> {
    return this.gamesService.updateGameData(hltbId);
  }

  @Query(() => [ExternalGameDTO], { name: 'upcomingGames' })
  async getUpcomingGames(
    @Args('limit') limit: number,
    @User() user?: UserAuthDTO,
  ): Promise<ExternalGameDTO[]> {
    return this.queryBus.execute<GetUpcomingGamesQuery>(
      new GetUpcomingGamesQuery(limit, user?.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameRatingObject, { name: 'fetchGameRatings' })
  async fetchGameRatings(
    @Args('hltbId', { type: () => Float }) hltbId: number,
  ): Promise<GameRatingObject> {
    return this.commandBus.execute(new FetchGameRatingsCommand(hltbId));
  }
}
