import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../database/prisma.service';
import { GetAllUserGamesStatusByOauthIdQuery } from './get_all_user_games_status_by_oauthid.query';
import { UserGamesStatusResponseDTO } from '../../games_status.dto';
import { $Enums } from '@prisma/client';

@QueryHandler(GetAllUserGamesStatusByOauthIdQuery)
export class GetAllUserGamesStatusByOauthIdHandler
  implements IQueryHandler<GetAllUserGamesStatusByOauthIdQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    query: GetAllUserGamesStatusByOauthIdQuery,
  ): Promise<UserGamesStatusResponseDTO[]> {
    const gamesStatus = await this.prismaService.gamesStatus.findMany({
      where: {
        oauthId: query.oauthId,
      },

      select: {
        id: true,
        score: true,
        platform: true,
        status: true,
        achievementsCompleted: true,
        completedIn: true,
        review: true,
        game: {
          select: {
            id: true,
            name: true,
            slug: true,
            hltbId: true,
            cover: true,
            platformForGame: {
              select: {
                platform: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
            release: {
              select: {
                id: true,
                date: true,
              },
            },
            genres: {
              select: {
                genre: {
                  select: {
                    id: true,
                    slug: true,
                    name: true,
                  },
                },
              },
            },
            completionTime: {
              select: {
                main: true,
                mainExtra: true,
                completionist: true,
              },
            },
          },
        },
      },
    });
    return this.mapGamesStatusToResponse(gamesStatus);
  }

  mapGamesStatusToResponse(
    gamesStatus: GameStatus[],
  ): UserGamesStatusResponseDTO[] {
    return gamesStatus.map((gameStatus) => {
      return {
        id: gameStatus.id,
        score: gameStatus.score,
        platform: {
          id: gameStatus.platform.id,
          name: gameStatus.platform.name,
          slug: gameStatus.platform.slug,
        },
        status: gameStatus.status,
        achievementsCompleted: gameStatus.achievementsCompleted,
        review: gameStatus.review,
        completedIn: gameStatus.completedIn
          ? {
              id: gameStatus.completedIn.id,
              hours: gameStatus.completedIn.hours,
              minutes: gameStatus.completedIn.minutes,
              seconds: gameStatus.completedIn.seconds,
              gamesStatusId: gameStatus.completedIn.gamesStatusId,
            }
          : null,
        game: {
          id: gameStatus.game.id,
          name: gameStatus.game.name,
          slug: gameStatus.game.slug,
          hltbId: gameStatus.game.hltbId,
          cover: gameStatus.game.cover
            ? {
                id: gameStatus.game.cover.id,
                smallUrl: gameStatus.game.cover.smallUrl,
                mediumUrl: gameStatus.game.cover.mediumUrl,
                bigUrl: gameStatus.game.cover.bigUrl,
              }
            : null,
          platforms: gameStatus.game.platformForGame.map((platform) => {
            return {
              id: platform.platform.id,
              slug: platform.platform.slug,
              name: platform.platform.name,
            };
          }),
          releases: gameStatus.game.release
            ? {
                id: gameStatus.game.release.id,
                date: gameStatus.game.release.date,
              }
            : null,
          genres: gameStatus.game.genres.map((genre) => {
            return {
              id: genre.genre.id,
              slug: genre.genre.slug,
              name: genre.genre.name,
            };
          }),
          completionTime: gameStatus.game.completionTime
            ? {
                main: gameStatus.game.completionTime.main,
                mainExtra: gameStatus.game.completionTime.mainExtra,
                completionist: gameStatus.game.completionTime.completionist,
              }
            : null,
        },
      };
    });
  }
}

type GameStatus = {
  id: number;
  score: string | null;
  status: $Enums.GameStatus;
  achievementsCompleted: boolean;
  review: string | null;
  completedIn: {
    id: number;
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
    gamesStatusId: number;
  } | null;
  platform: {
    id: number;
    name: string;
    slug: string;
  };
  game: {
    id: number;
    name: string;
    slug: string;
    hltbId: number;
    cover: {
      id: number;
      smallUrl: string;
      mediumUrl: string;
      bigUrl: string;
    } | null;
    platformForGame: {
      platform: {
        id: number;
        name: string;
        slug: string;
      };
    }[];
    release: {
      id: number;
      date: number | null;
    } | null;
    genres: {
      genre: {
        id: number;
        slug: string;
        name: string;
      };
    }[];
    completionTime: {
      main: number;
      mainExtra: number;
      completionist: number;
    } | null;
  };
};
