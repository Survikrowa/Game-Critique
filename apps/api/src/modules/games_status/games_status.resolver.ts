import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UpsertGameStatusArgsDTO,
  GameStatusSuccessResponseDTO,
  UserGamesStatusResponseDTO,
} from './games_status.dto';
import { GamesStatusService } from './games_status.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { User } from '../auth/auth.decorators';
import { UserDTO } from '../auth/auth.dto';

@Resolver()
export class GamesStatusResolver {
  constructor(private readonly gamesStatusService: GamesStatusService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameStatusSuccessResponseDTO)
  async upsertGameStatus(
    @User() user: UserDTO,
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
  @Query(() => [UserGamesStatusResponseDTO], { name: 'userGamesStatus' })
  async getAllUserGamesStatus(
    @User() user: UserDTO,
  ): Promise<UserGamesStatusResponseDTO[]> {
    return this.gamesStatusService.getAllUserGamesStatus(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserGamesStatusResponseDTO, { name: 'userGameStatus' })
  async getUserGameStatus(
    @User() user: UserDTO,
    @Args('gameStatusId') gameStatusId: number,
  ): Promise<UserGamesStatusResponseDTO> {
    const userGameStatus = await this.gamesStatusService.getUserGameStatusById(
      user.sub,
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
}
