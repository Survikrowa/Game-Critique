import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertGameStatusArgsDTO } from './games_status.dto';
import { GameStatus } from '@prisma/client';

@Injectable()
export class GamesStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  removeGameStatus(gameStatusId: number) {
    return this.prismaService.gamesStatus.delete({
      where: {
        id: gameStatusId,
      },
    });
  }

  getAllUserGamesStatus({
    oauthId,
    take,
    skip,
    status,
  }: GetAllUserGamesStatusArgs) {
    return this.prismaService.gamesStatus.findMany({
      where: {
        user: {
          oauthId,
        },
        status,
      },
      include: {
        platform: true,
        game: {
          include: {
            cover: true,
            platformForGame: {
              include: {
                platform: true,
              },
            },
            genres: {
              include: {
                genre: true,
              },
            },
            release: true,
            completionTime: true,
          },
        },
        completedIn: true,
      },
      take,
      skip,
    });
  }

  async countUserGamesStatusEntriesByStatus(
    oauthId: string,
    status: GameStatus,
  ) {
    return this.prismaService.gamesStatus.count({
      where: {
        user: {
          oauthId,
        },
        status,
      },
    });
  }

  async getUserGameStatusById(oauthId: string, gameStatusId: number) {
    console.log(oauthId);
    return this.prismaService.gamesStatus.findFirst({
      where: {
        user: {
          oauthId,
        },
        id: gameStatusId,
      },
      include: {
        platform: true,
        game: {
          include: {
            cover: true,
            platformForGame: {
              include: {
                platform: true,
              },
            },
            genres: {
              include: {
                genre: true,
              },
            },
            release: true,
            completionTime: true,
          },
        },
        completedIn: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getGamesStatusByProfileAndGameData(
    oauthId: string,
    gameId: number,
    platformId: number,
  ) {
    return this.prismaService.gamesStatus.findFirst({
      where: {
        user: {
          oauthId,
        },
        gameId,
        platformId,
      },
    });
  }
  upsertGameStatus(
    createGameStatusArgs: UpsertGameStatusArgsDTO,
    oauthId: string,
  ) {
    return this.prismaService.gamesStatus.upsert({
      where: {
        id: createGameStatusArgs.gamesStatusId || 0,
      },
      update: {
        status: createGameStatusArgs.gameStatus,
        achievementsCompleted: createGameStatusArgs.achievementsCompleted,
        score: createGameStatusArgs.score,
        completedIn: {
          update: {
            hours: Number(createGameStatusArgs.completedIn?.hours || 0),
            minutes: Number(createGameStatusArgs.completedIn?.minutes || 0),
            seconds: Number(createGameStatusArgs.completedIn?.seconds || 0),
          },
        },
      },
      create: {
        game: {
          connect: {
            id: createGameStatusArgs.gameId,
          },
        },
        platform: {
          connect: {
            id: createGameStatusArgs.platformId,
          },
        },
        user: {
          connect: {
            oauthId,
          },
        },
        status: createGameStatusArgs.gameStatus,
        achievementsCompleted: createGameStatusArgs.achievementsCompleted,
        score: createGameStatusArgs.score,
        completedIn: {
          create: {
            hours: Number(createGameStatusArgs.completedIn?.hours || 0),
            minutes: Number(createGameStatusArgs.completedIn?.minutes || 0),
            seconds: Number(createGameStatusArgs.completedIn?.seconds || 0),
          },
        },
      },
    });
  }
}

type GetAllUserGamesStatusArgs = {
  oauthId: string;
  take?: number;
  skip?: number;
  status: GameStatus;
};
