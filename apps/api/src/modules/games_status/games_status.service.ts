import { Injectable } from '@nestjs/common';
import { GamesStatusRepository } from './games_status.repository';
import { UpsertGameStatusArgsDTO } from './games_status.dto';
import { UsersActivityService } from '../users/users_activity/users_activity.service';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class GamesStatusService {
  constructor(
    private readonly gamesStatusRepository: GamesStatusRepository,
    private readonly usersActivityService: UsersActivityService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAllUserGamesStatus(oauthId: string) {
    const userGameStatus =
      await this.gamesStatusRepository.getAllUserGamesStatus(oauthId);
    if (userGameStatus) {
      return userGameStatus.map((gameStatus) => {
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
      });
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