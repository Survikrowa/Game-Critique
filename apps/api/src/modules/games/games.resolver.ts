import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from './games.service';
import {
  GameWithAllDataDTO,
  GetPaginatedGamesArgs,
  PaginatedGamesDTO,
  UpdateGameDataDTO,
} from './games.dto';
import { UseGuards } from '@nestjs/common';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';

@Resolver()
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

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
}
