import { Injectable } from '@nestjs/common';
import { GamesStatusRepository } from './games_status.repository';
import { UpsertGameStatusArgsDTO } from './games_status.dto';
import { UsersActivityService } from '../users/users_activity/users_activity.service';
import { PrismaService } from '../database/prisma.service';
import { GameStatus } from '@prisma/client';
@Injectable()
export class GamesStatusService {
  constructor(
    private readonly gamesStatusRepository: GamesStatusRepository,
    private readonly usersActivityService: UsersActivityService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAllUserGamesStatus({
    oauthId,
    take = 5,
    skip = 0,
    status,
    search,
  }: GetAllUserGamesStatusArgs) {
    const userGameStatus =
      await this.gamesStatusRepository.getAllUserGamesStatus({
        oauthId,
        take,
        skip,
        status,
        search: search || '',
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
        },
      };
    }
    return userGameStatus;
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
}

type GetAllUserGamesStatusArgs = {
  oauthId: string;
  take?: number;
  skip?: number;
  status: GameStatus;
  search?: string | null;
};
