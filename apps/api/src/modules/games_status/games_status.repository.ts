import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertGameStatusArgsDTO } from './games_status.dto';
import { GameStatus } from '@prisma/client';

const PLATFORMS_ALL = '0';

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

  getGameStatusById(gameStatusId: number) {
    return this.prismaService.gamesStatus.findFirst({
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
    search = '',
    filters,
    sort,
  }: GetAllUserGamesStatusArgs) {
    return this.prismaService.gamesStatus.findMany({
      where: {
        user: {
          oauthId,
        },
        status,
        game: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        platform: this.buildPlatformFilter(filters),
        achievementsCompleted: this.buildAchievementsCompletedFilter(
          filters?.achievementsCompleted,
        ),
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
      orderBy: this.buildOrderBy(sort),
      take,
      skip,
    });
  }

  buildAchievementsCompletedFilter(
    achievementsCompleted?: FiltersGameStatus['achievementsCompleted'] | null,
  ) {
    if (achievementsCompleted === 'all') return undefined;
    if (achievementsCompleted === 'completed') {
      return true;
    }
    if (achievementsCompleted === 'incomplete') {
      return false;
    }
    return undefined;
  }

  buildOrderBy(sort: SortGamesStatus) {
    if (sort.order !== 'desc' && sort.order !== 'asc') {
      return {
        createdAt: 'desc' as const,
      };
    }
    if (sort.field === 'added') {
      return this.getAddedDateOrderBy(sort.order);
    }
    if (sort.field === 'score') {
      return this.getScoreOrderBy(sort.order);
    }
    if (sort.field === 'title') {
      return this.getGameTitleAlphabeticalOrderBy(sort.order);
    }
    return {
      createdAt: 'desc' as const,
    };
  }

  getAddedDateOrderBy(order: 'asc' | 'desc') {
    return {
      createdAt: order,
    };
  }

  getScoreOrderBy(order: 'asc' | 'desc') {
    return {
      score: order,
    };
  }

  getGameTitleAlphabeticalOrderBy(order: 'asc' | 'desc') {
    return {
      game: {
        name: order,
      },
    };
  }

  buildPlatformFilter(filters?: FiltersGameStatus | null) {
    if (!filters?.platform) return undefined;
    if (filters.platform === PLATFORMS_ALL) return undefined;
    return {
      id: Number(filters.platform),
    };
  }

  async countUserGamesStatusEntriesByStatus(
    oauthId: string,
    status: GameStatus,
    search?: string,
  ) {
    return this.prismaService.gamesStatus.count({
      where: {
        user: {
          oauthId,
        },
        status,
        game: {
          name: {
            contains: search,
          },
        },
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
        review: createGameStatusArgs.review,
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
        review: createGameStatusArgs.review,
      },
    });
  }

  async getUserGameStatusReview(gameId: number, oauthId: string) {
    return this.prismaService.gamesStatus.findFirst({
      where: {
        gameId,
        user: {
          oauthId,
        },
      },
      select: {
        review: true,
      },
    });
  }

  async getFriendsGameStatusReviews(gameStatusId: number, gameId: number) {
    return this.prismaService.gamesStatus.findMany({
      where: {
        id: gameStatusId,
      },
      select: {
        user: {
          include: {
            friendsList: {
              select: {
                FriendsListForFriends: {
                  select: {
                    friend: {
                      select: {
                        user: {
                          select: {
                            GamesStatus: {
                              where: {
                                gameId,
                              },
                              select: {
                                review: true,
                                score: true,
                              },
                            },
                            profile: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
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
  search?: string;
  filters?: FiltersGameStatus | null;
  sort: SortGamesStatus;
};

type FiltersGameStatus = {
  platform: string;
  achievementsCompleted: string;
};

type SortGamesStatus = {
  field: string;
  order: string;
};
