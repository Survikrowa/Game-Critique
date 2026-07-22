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

    const [allStatuses, completedThisYear, backlogAddedThisYear] =
      await Promise.all([
        this.prisma.gamesStatus.findMany({
          where: { user: { oauthId } },
          include: { completedIn: true },
        }),
        this.prisma.gamesStatus.count({
          where: {
            user: { oauthId },
            status: 'COMPLETED',
            updatedAt: { gte: yearStart, lt: yearEnd },
          },
        }),
        this.prisma.gamesStatus.count({
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
    let yearlyGames = 0;
    let yearlySeconds = 0;
    let yearlyScoreSum = 0;
    let yearlyScoreCount = 0;

    for (const status of allStatuses) {
      const isYearly =
        status.updatedAt >= yearStart && status.updatedAt < yearEnd;

      if (status.completedIn) {
        const h = status.completedIn.hours || 0;
        const m = status.completedIn.minutes || 0;
        const s = status.completedIn.seconds || 0;
        const seconds =
          h * MINUTES_IN_HOUR * SECONDS_IN_MINUTE + m * SECONDS_IN_MINUTE + s;
        totalSeconds += seconds;
        if (isYearly) yearlySeconds += seconds;
      }
      if (status.score) {
        const parsed = parseFloat(status.score.replace('-', '.'));
        if (!isNaN(parsed)) {
          scoreSum += parsed;
          scoreCount++;
          if (isYearly) {
            yearlyScoreSum += parsed;
            yearlyScoreCount++;
          }
        }
      }
      if (isYearly) yearlyGames++;
    }

    const totalHours =
      Math.round((totalSeconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) * 10) /
      10;
    const averageScore =
      scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : null;
    const yearlyHours =
      Math.round((yearlySeconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) * 10) /
      10;
    const yearlyAverageScore =
      yearlyScoreCount > 0
        ? Math.round((yearlyScoreSum / yearlyScoreCount) * 10) / 10
        : null;

    return {
      totalGames,
      totalHours,
      averageScore,
      completedThisYear,
      backlogAddedThisYear,
      yearlyGames,
      yearlyHours,
      yearlyAverageScore,
    };
  }
}
