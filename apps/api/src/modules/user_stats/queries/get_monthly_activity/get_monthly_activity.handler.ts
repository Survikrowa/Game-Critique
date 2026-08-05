import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMonthlyActivityQuery } from './get_monthly_activity.query';
import { PrismaService } from '../../../database/prisma.service';
import { MonthlyActivityDTO } from '../../user_stats.dto';

@QueryHandler(GetMonthlyActivityQuery)
export class GetMonthlyActivityHandler
  implements IQueryHandler<GetMonthlyActivityQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetMonthlyActivityQuery): Promise<MonthlyActivityDTO[]> {
    const { year, oauthId } = query;
    const yearStart = year ? new Date(`${year}-01-01T00:00:00Z`) : new Date(0);
    const yearEnd = year
      ? new Date(`${year + 1}-01-01T00:00:00Z`)
      : new Date('9999-01-01T00:00:00Z');

    const completedStatuses = await this.prisma.gamesStatus.findMany({
      where: {
        user: { oauthId },
        status: 'COMPLETED',
        updatedAt: { gte: yearStart, lt: yearEnd },
      },
      include: { completedIn: true },
    });

    const monthly: Record<
      number,
      { gamesCompleted: number; hoursPlayed: number }
    > = {};
    for (let m = 1; m <= 12; m++) {
      monthly[m] = { gamesCompleted: 0, hoursPlayed: 0 };
    }

    for (const status of completedStatuses) {
      const month = status.updatedAt.getUTCMonth() + 1;
      monthly[month].gamesCompleted++;
      if (status.completedIn) {
        const h = status.completedIn.hours || 0;
        const m = status.completedIn.minutes || 0;
        monthly[month].hoursPlayed += h + m / 60;
      }
    }

    return Object.entries(monthly).map(([monthStr, data]) => ({
      month: Number(monthStr),
      gamesCompleted: data.gamesCompleted,
      hoursPlayed: Math.round(data.hoursPlayed * 10) / 10,
    }));
  }
}
