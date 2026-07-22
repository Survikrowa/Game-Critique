import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetYearlySummaryQuery } from './get_yearly_summary.query';
import { PrismaService } from '../../../database/prisma.service';
import { YearlySummaryDTO } from '../../user_stats.dto';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

@QueryHandler(GetYearlySummaryQuery)
export class GetYearlySummaryHandler
  implements IQueryHandler<GetYearlySummaryQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetYearlySummaryQuery): Promise<YearlySummaryDTO> {
    const { year, oauthId } = query;
    const yearStart = new Date(`${year}-01-01T00:00:00Z`);
    const yearEnd = new Date(`${year + 1}-01-01T00:00:00Z`);

    return this.prisma.$transaction(async (prisma) => {
      const [allStatuses, completedThisYear, backlogAddedThisYear] =
        await Promise.all([
          prisma.gamesStatus.findMany({
            where: { user: { oauthId } },
            include: { completedIn: true },
          }),
          prisma.gamesStatus.count({
            where: {
              user: { oauthId },
              status: 'COMPLETED',
              updatedAt: { gte: yearStart, lt: yearEnd },
            },
          }),
          prisma.gamesStatus.count({
            where: {
              user: { oauthId },
              status: 'BACKLOG',
              createdAt: { gte: yearStart, lt: yearEnd },
            },
          }),
        ]);

      const totalGames = allStatuses.length;

      let totalSeconds = 0;
      let scoreSum = 0;
      let scoreCount = 0;

      for (const status of allStatuses) {
        if (status.completedIn) {
          const h = status.completedIn.hours || 0;
          const m = status.completedIn.minutes || 0;
          const s = status.completedIn.seconds || 0;
          totalSeconds +=
            h * MINUTES_IN_HOUR * SECONDS_IN_MINUTE + m * SECONDS_IN_MINUTE + s;
        }
        if (status.score) {
          const parsed = parseFloat(status.score.replace('-', '.'));
          if (!isNaN(parsed)) {
            scoreSum += parsed;
            scoreCount++;
          }
        }
      }

      const totalHours =
        Math.round(
          (totalSeconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) * 10,
        ) / 10;
      const averageScore =
        scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : null;

      return {
        totalGames,
        totalHours,
        averageScore,
        completedThisYear,
        backlogAddedThisYear,
      };
    });
  }
}
