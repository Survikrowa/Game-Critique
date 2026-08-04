import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStreakQuery } from './get_streak.query';
import { PrismaService } from '../../../database/prisma.service';
import { StreakDTO } from '../../user_stats.dto';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const ISO_WEEKDAY_THURSDAY_OFFSET = 4;
const ISO_FIRST_WEEK_THRESHOLD = 1;
const ONE_DAY_MS =
  HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;

const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || DAYS_IN_WEEK;
  d.setUTCDate(d.getUTCDate() + ISO_WEEKDAY_THURSDAY_OFFSET - dayNum);
  const yearStart = new Date(
    Date.UTC(d.getUTCFullYear(), 0, ISO_FIRST_WEEK_THRESHOLD),
  );
  return Math.ceil(
    ((d.getTime() - yearStart.getTime()) / ONE_DAY_MS +
      ISO_FIRST_WEEK_THRESHOLD) /
      DAYS_IN_WEEK,
  );
};

@QueryHandler(GetStreakQuery)
export class GetStreakHandler implements IQueryHandler<GetStreakQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetStreakQuery): Promise<StreakDTO> {
    const { oauthId } = query;

    const activities = await this.prisma.userActivity.findMany({
      where: { oauthId },
      orderBy: { createdAt: 'desc' },
    });

    const weekSet = new Set<string>();
    for (const activity of activities) {
      const year = activity.createdAt.getUTCFullYear();
      const week = getWeekNumber(activity.createdAt);
      weekSet.add(`${year}-W${String(week).padStart(2, '0')}`);
    }

    const sortedWeeks = Array.from(weekSet).sort().reverse();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < sortedWeeks.length; i++) {
      if (i === 0) {
        tempStreak = 1;
        currentStreak = 1;
      } else {
        const prevParts = sortedWeeks[i - 1].split('-W');
        const currParts = sortedWeeks[i].split('-W');
        const prevWeekNum = parseInt(prevParts[1]);
        const currWeekNum = parseInt(currParts[1]);
        const prevYear = parseInt(prevParts[0]);
        const currYear = parseInt(currParts[0]);

        const isConsecutive =
          (currYear === prevYear && currWeekNum === prevWeekNum - 1) ||
          (currYear === prevYear - 1 && prevWeekNum === 1 && currWeekNum >= 52);

        if (isConsecutive) {
          tempStreak++;
          currentStreak = tempStreak;
        } else {
          if (tempStreak > longestStreak) longestStreak = tempStreak;
          tempStreak = 1;
        }
      }
    }

    if (tempStreak > longestStreak) longestStreak = tempStreak;

    return { currentStreak, longestStreak };
  }
}
