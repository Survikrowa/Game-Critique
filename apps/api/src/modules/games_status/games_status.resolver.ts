import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UpsertGameStatusArgsDTO,
  GameStatusSuccessResponseDTO,
  UserGamesStatusResponseDTO,
  UserGamesStatusResponseWithPaginationDTO,
} from './games_status.dto';
import { GamesStatusService } from './games_status.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { User } from '../auth/auth.decorators';
import { UserAuthDTO } from '../auth/auth.dto';
import { GetAllUserGamesStatusArgs } from './games_status.args';

@Resolver()
export class GamesStatusResolver {
  constructor(private readonly gamesStatusService: GamesStatusService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameStatusSuccessResponseDTO)
  async upsertGameStatus(
    @User() user: UserAuthDTO,
    @Args('upsertGameStatusArgs') upsertGameStatusArgs: UpsertGameStatusArgsDTO,
  ) {
    const userHasGameStatusWithPlatformId =
      await this.gamesStatusService.userHasGameStatusWithPlatformId(
        user.sub,
        upsertGameStatusArgs.gameId,
        upsertGameStatusArgs.platformId,
      );
    if (userHasGameStatusWithPlatformId && !upsertGameStatusArgs.isEditing) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Posiadasz już taki status gry na tym koncie i platformie',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.gamesStatusService.upsertGameStatus(
      upsertGameStatusArgs,
      user.sub,
    );

    return {
      message: 'GameStatus Upserted Successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserGamesStatusResponseWithPaginationDTO, {
    name: 'userGamesStatus',
    description:
      'If oauthId is not provided it will use the id of the user that called the query',
  })
  async getAllUserGamesStatus(
    @User() user: UserAuthDTO,
    @Args()
    { take, skip, status, oauthId }: GetAllUserGamesStatusArgs,
  ): Promise<UserGamesStatusResponseWithPaginationDTO> {
    return this.gamesStatusService.getAllUserGamesStatus({
      oauthId: oauthId || user.sub,
      take,
      skip,
      status,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserGamesStatusResponseDTO, {
    name: 'userGameStatus',
    description:
      'If oauthId is not provided it will use the id of the user that called the query',
  })
  async getUserGameStatus(
    @User() user: UserAuthDTO,
    @Args('gameStatusId') gameStatusId: number,
    @Args('oauthId', { nullable: true }) oauthId: string,
  ): Promise<UserGamesStatusResponseDTO> {
    const userGameStatus = await this.gamesStatusService.getUserGameStatusById(
      oauthId || user.sub,
      gameStatusId,
    );
    if (!userGameStatus) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Nie znaleziono statusu gry dla tego użytkownika',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return userGameStatus;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameStatusSuccessResponseDTO)
  async removeGameStatus(@Args('gameStatusId') gameStatusId: number) {
    const removedGameStatus =
      await this.gamesStatusService.removeGameStatus(gameStatusId);

    if (!removedGameStatus) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Nie znaleziono statusu gry o podanym id',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Pomyślnie usunięto status gry',
    };
  }
}
