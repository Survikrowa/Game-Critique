import { Injectable } from '@nestjs/common';
import { GamesStatusRepository } from './games_status.repository';
import {
  UpsertGameStatusArgsDTO,
  UserGamesStatusResponseDTO,
} from './games_status.dto';
import { UsersActivityService } from '../users/users_activity/users_activity.service';
import { PrismaService } from '../database/prisma.service';
import { GameStatus } from '@prisma/client';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUserGamesStatusByOauthIdQuery } from './queries/get_all_user_games_status_by_oauthid/get_all_user_games_status_by_oauthid.query';
import { RemoveUserGameStatusByUserOauthIdCommand } from './commands/remove_user_game_status_by_user_oauth_id/remove_user_game_status_by_user_oauth_id.command';
import { SORT_OPTIONS } from './games_status.data';
@Injectable()
export class GamesStatusService {
  constructor(
    private readonly gamesStatusRepository: GamesStatusRepository,
    private readonly usersActivityService: UsersActivityService,
    private readonly prismaService: PrismaService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllUserGamesStatusPaginatedData({
    oauthId,
    take = 5,
    skip = 0,
    status,
    search,
    filters,
    sort,
  }: GetAllUserGamesStatusArgs) {
    const userGameStatus =
      await this.gamesStatusRepository.getAllUserGamesStatus({
        oauthId,
        take,
        skip,
        status,
        search: search || '',
        filters,
        sort,
      });
    const userGamesStatusCount =
      await this.gamesStatusRepository.countUserGamesStatusEntriesByStatus(
        oauthId,
        status,
        search || '',
      );
    if (userGameStatus) {
      return {
        userGamesStatus: userGameStatus.map((gameStatus) => {
          return {
            ...gameStatus,
            game: {
              ...gameStatus.game,
              platforms: gameStatus.game.platformForGame.map((platform) => {
                return {
                  ...platform.platform,
                };
              }),
              genres: gameStatus.game.genres.map((genre) => {
                return {
                  ...genre.genre,
                };
              }),
              releases: gameStatus.game.release,
            },
          };
        }),
        pagination: {
          total: userGamesStatusCount,
          hasMore: userGamesStatusCount > take + skip,
          hasPrevious: skip > 0,
          skip,
          take,
        },
      };
    }
    return userGameStatus;
  }

  async getAllUserGamesStatusByOauthId(
    oauthId: string,
  ): Promise<UserGamesStatusResponseDTO[]> {
    return this.queryBus.execute<
      GetAllUserGamesStatusByOauthIdQuery,
      UserGamesStatusResponseDTO[]
    >(new GetAllUserGamesStatusByOauthIdQuery(oauthId));
  }

  getGamesStatusSortOptions() {
    return SORT_OPTIONS;
  }

  getAvailableGamesStatusProgressStates() {
    return Object.entries(GameStatus).map(([key, value]) => {
      const label = this.mapKeyToLabel(key);
      return {
        value,
        label,
      };
    });
  }

  mapKeyToLabel(key: string) {
    if (key === 'IN_PROGRESS') {
      return 'W trakcie';
    }
    if (key === 'COMPLETED') {
      return 'Ukończona';
    }
    if (key === 'RETIRED') {
      return 'Porzucona';
    }
    return 'Nieznany';
  }
  async getUserGameStatusById(oauthId: string, gameStatusId: number) {
    const userGameStatus =
      await this.gamesStatusRepository.getUserGameStatusById(
        oauthId,
        gameStatusId,
      );

    if (userGameStatus) {
      return {
        ...userGameStatus,
        game: {
          ...userGameStatus.game,
          platforms: userGameStatus.game.platformForGame.map((platform) => {
            return {
              ...platform.platform,
            };
          }),
          genres: userGameStatus.game.genres.map((genre) => {
            return {
              ...genre.genre,
            };
          }),
          releases: userGameStatus.game.release,
        },
      };
    }
    return userGameStatus;
  }

  async userHasGameStatusWithPlatformId(
    oauthId: string,
    gameId: number,
    platformId: number,
  ) {
    return this.gamesStatusRepository.getGamesStatusByProfileAndGameData(
      oauthId,
      gameId,
      platformId,
    );
  }
  async upsertGameStatus(
    createGameStatusArgs: UpsertGameStatusArgsDTO,
    oauthId: string,
  ) {
    return this.prismaService.$transaction(async () => {
      await this.usersActivityService.registerNewUserActivity({
        oauthId,
        activity: createGameStatusArgs.gameStatus,
        gameId: createGameStatusArgs.gameId,
      });
      return this.gamesStatusRepository.upsertGameStatus(
        createGameStatusArgs,
        oauthId,
      );
    });
  }

  async removeGameStatus(gameStatusId: number) {
    return this.gamesStatusRepository.removeGameStatus(gameStatusId);
  }

  async removeUserGameStatusByUserOauthId(
    gameStatusId: number,
    oauthId: string,
  ) {
    await this.commandBus.execute(
      new RemoveUserGameStatusByUserOauthIdCommand(oauthId, gameStatusId),
    );
  }

  async getOwnerAndFriendsGameStatusReviews(gameStatusId: number) {
    return this.prismaService.$transaction(async () => {
      const gameStatus =
        await this.gamesStatusRepository.getGameStatusById(gameStatusId);
      if (gameStatus) {
        const ownerAndFriendsGameStatuses =
          await this.gamesStatusRepository.getFriendsGameStatusReviews(
            gameStatusId,
            gameStatus.gameId,
          );

        return ownerAndFriendsGameStatuses.flatMap(
          (ownerAndFriendsGameStatus) => {
            if (!ownerAndFriendsGameStatus.user.friendsList) {
              return [];
            }
            return ownerAndFriendsGameStatus.user.friendsList.FriendsListForFriends.flatMap(
              (friendsList) => {
                return friendsList.friend.user.GamesStatus.map(
                  (gameStatus) => ({
                    review: gameStatus.review,
                    profile: friendsList.friend.user.profile,
                    score: gameStatus.score,
                  }),
                );
              },
            );
          },
        );
      }
      return [];
    });
  }
}

type GetAllUserGamesStatusArgs = {
  oauthId: string;
  take?: number;
  skip?: number;
  status: GameStatus;
  search?: string | null;
  filters?: FiltersGameStatus | null;
  sort: SortGamesStatus;
};

type FiltersGameStatus = {
  platform: string;
};

type SortGamesStatus = {
  field: string;
  order: string;
};
