import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UpsertGameStatusArgsDTO,
  GameStatusSuccessResponseDTO,
  UserGamesStatusResponseDTO,
  UserGamesStatusResponseWithPaginationDTO,
  FriendsGameStatusReviewsDTO,
  GameStatusRemovedResponseDTO,
  SortOptionsDTO,
  GameStatusProgressStateDTO,
  UserFriendGamesStatusResponseWithPaginationDTO,
} from './games_status.dto';
import { GamesStatusService } from './games_status.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { User } from '../auth/auth.decorators';
import { UserAuthDTO } from '../auth/auth.dto';
import {
  GetAllUserFriendGamesStatusArgs,
  GetAllUserGamesStatusArgs,
} from './games_status.args';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';

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
  async getAllUserGamesStatusPaginatedData(
    @User() user: UserAuthDTO,
    @Args()
    { take, skip, status, search, filters, sort }: GetAllUserGamesStatusArgs,
  ): Promise<UserGamesStatusResponseWithPaginationDTO> {
    return this.gamesStatusService.getAllUserGamesStatusPaginatedData({
      oauthId: user.sub,
      take,
      skip,
      status,
      search,
      filters,
      sort,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserFriendGamesStatusResponseWithPaginationDTO, {
    name: 'userFriendGamesStatus',
    description: 'Query to get user"s friend games statuses',
  })
  async getUserFriendGamesStatus(
    @Args()
    {
      take,
      skip,
      status,
      oauthId,
      search,
      filters,
      sort,
    }: GetAllUserFriendGamesStatusArgs,
  ): Promise<UserFriendGamesStatusResponseWithPaginationDTO> {
    return this.gamesStatusService.getAllUserGamesStatusPaginatedData({
      oauthId,
      take,
      skip,
      status,
      search,
      filters,
      sort,
    });
  }

  @Query(() => [UserGamesStatusResponseDTO])
  @UseGuards(JwtAuthGuard, AdminUserGuard)
  async getAllUserGamesStatusByOauthId(
    @Args('oauthId') oauthId: string,
  ): Promise<UserGamesStatusResponseDTO[]> {
    return this.gamesStatusService.getAllUserGamesStatusByOauthId(oauthId);
  }

  @Mutation(() => GameStatusRemovedResponseDTO, {
    name: 'removeUserGameStatusByUserOauthId',
    description:
      'Admin mutation to remove game status by gameStatusId and user oauthId',
  })
  @UseGuards(JwtAuthGuard, AdminUserGuard)
  async removeUserGameStatusByUserOauthId(
    @Args('gameStatusId') gameStatusId: number,
    @Args('oauthId') oauthId: string,
  ) {
    await this.gamesStatusService.removeUserGameStatusByUserOauthId(
      gameStatusId,
      oauthId,
    );

    return {
      message: 'Successfully removed game status',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserGamesStatusResponseDTO, {
    name: 'userGameStatus',
    description:
      'If oauthId is not provided it will use the id of the user that called the query',
  })
  async getUserGameStatus(
    @User() user: UserAuthDTO,
    @Args('gameStatusId', { nullable: true }) gameStatusId: number,
    @Args('oauthId', { nullable: true }) oauthId: string,
  ): Promise<UserGamesStatusResponseDTO> {
    const userGameStatus = await this.gamesStatusService.getUserGameStatusById(
      oauthId && oauthId !== 'undefined' ? oauthId : user.sub,
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

  @UseGuards(JwtAuthGuard)
  @Query(() => [FriendsGameStatusReviewsDTO], {
    name: 'ownerAndFriendsGameStatusReviews',
    description: 'Get user and friends game status reviews',
  })
  async getFriendsGameStatusReviews(
    @Args('gameStatusId') gameStatusId: number,
  ): Promise<FriendsGameStatusReviewsDTO[]> {
    return this.gamesStatusService.getOwnerAndFriendsGameStatusReviews(
      gameStatusId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => SortOptionsDTO, {
    name: 'gamesStatusSortOptions',
    description: 'Get games status sort options',
  })
  async getGamesStatusSortOptions(): Promise<SortOptionsDTO> {
    return {
      sortOptions: this.gamesStatusService.getGamesStatusSortOptions(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GameStatusProgressStateDTO, {
    name: 'availableGamesStatusProgressStates',
    description: 'Get available games status progress states',
  })
  async getGamesStatusProgressState(): Promise<GameStatusProgressStateDTO> {
    return {
      gameStatusProgressState:
        this.gamesStatusService.getAvailableGamesStatusProgressStates(),
    };
  }
}
