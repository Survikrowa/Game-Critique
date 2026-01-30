import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from './games.service';
import {
  ExternalGameDTO,
  GameWithAllDataDTO,
  GetPaginatedGamesArgs,
  PaginatedGamesDTO,
  UpdateGameDataDTO,
} from './games.dto';
import { UseGuards } from '@nestjs/common';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetUpcomingGamesQuery } from './queries/get_upcoming_games/get_upcoming_games.query';

@Resolver()
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly queryBus: QueryBus,
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
  ): Promise<ExternalGameDTO[]> {
    return this.queryBus.execute<GetUpcomingGamesQuery>(
      new GetUpcomingGamesQuery(limit),
    );
  }
}
