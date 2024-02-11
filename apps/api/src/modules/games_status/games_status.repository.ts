import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertGameStatusArgsDTO } from './games_status.dto';

@Injectable()
export class GamesStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUserGamesStatus(oauthId: string) {
    return this.prismaService.gamesStatus.findMany({
      where: {
        user: {
          oauthId,
        },
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
          },
        },
        completedIn: true,
      },
    });
  }

  async getUserGameStatusById(oauthId: string, gameStatusId: number) {
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
            hours: Number(createGameStatusArgs.completedIn.hours),
            minutes: Number(createGameStatusArgs.completedIn.minutes),
            seconds: Number(createGameStatusArgs.completedIn.seconds),
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
            hours: Number(createGameStatusArgs.completedIn.hours),
            minutes: Number(createGameStatusArgs.completedIn.minutes),
            seconds: Number(createGameStatusArgs.completedIn.seconds),
          },
        },
      },
    });
  }
}
