import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserStatsByTypeQuery } from './get_all_user_stats_by_type.query';
import { PrismaService } from '../../../database/prisma.service';

@QueryHandler(GetAllUserStatsByTypeQuery)
export class GetAllUserStatsByTypeQueryHandler
  implements IQueryHandler<GetAllUserStatsByTypeQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetAllUserStatsByTypeQuery) {
    return this.getAllUserStatsByType(query);
  }

  async getAllUserStatsByType({ oauthId, type }: GetAllUserStatsByTypeQuery) {
    if (type === 'platforms') {
      return this.groupAndCountByPlatform(oauthId);
    }
    if (type === 'ratings') {
      return this.groupAndCountByScore(oauthId);
    }
    if (type === 'release_year') {
      return this.groupAndCountByReleaseYear(oauthId);
    }
    return [];
  }

  async groupAndCountByReleaseYear(oauthId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const releaseDates = await prisma.gamesStatus.findMany({
        where: {
          user: {
            oauthId,
          },
        },
        select: {
          game: {
            select: {
              release: true,
            },
          },
        },
      });
      const yearsCount = releaseDates.reduce(
        (acc, item) => {
          const year = item.game.release;
          if (year?.date) {
            acc[year.date] = (acc[year.date] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      );
      return Object.entries(yearsCount)
        .map(([key, value]) => ({
          label: key,
          value,
        }))
        .sort((a, b) => {
          const aYear = parseInt(a.label, 10);
          const bYear = parseInt(b.label, 10);
          return bYear - aYear;
        });
    });
  }

  /**
   * Groups and counts the games by score for a given user.
   * @param oauthId - The OAuth ID of the user.
   * @returns An array of objects containing the score and the count of games.
   */
  async groupAndCountByScore(oauthId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const scoresCount = await prisma.gamesStatus.groupBy({
        by: ['score'],
        where: {
          user: {
            oauthId,
          },
        },
        _count: {
          score: true,
        },
      });

      return scoresCount
        .flatMap((score) => {
          if (score.score && typeof score.score === 'string') {
            return {
              label: score.score.toString().replace('-', '.'),
              value: score._count.score,
            };
          }
          return [];
        })
        .sort((a, b) => {
          return b.value - a.value;
        });
    });
  }

  /**
   * Groups and counts the games by platform for a given user.
   * @param oauthId - The OAuth ID of the user.
   * @returns An array of objects containing the platform name and the count of games.
   */
  async groupAndCountByPlatform(oauthId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const platformsCount = await prisma.gamesStatus.groupBy({
        by: ['platformId'],
        where: {
          user: {
            oauthId,
          },
        },
        _count: {
          platformId: true,
        },
      });
      const platforms = await prisma.platform.findMany({
        where: {
          id: {
            in: platformsCount.map((platform) => platform.platformId),
          },
        },
      });
      return platforms
        .map((platform) => {
          const platformCount = platformsCount.find(
            (platformCount) => platformCount.platformId === platform.id,
          );
          return {
            label: platform.displayName ? platform.displayName : platform.name,
            value: platformCount ? platformCount._count.platformId : 0,
          };
        })
        .sort((a, b) => {
          return b.value - a.value;
        });
    });
  }
}
