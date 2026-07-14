import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../../database/prisma.service';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../domain/ports/push-token.repository.port';
import {
  NOTIFICATIONS_SERVICE,
  NotificationsServicePort,
} from '../../domain/ports/notifications.service.port';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const MS_IN_WEEK =
  DAYS_IN_WEEK *
  HOURS_IN_DAY *
  MINUTES_IN_HOUR *
  SECONDS_IN_MINUTE *
  MS_IN_SECOND;
const MS_IN_DAY =
  HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const ROUNDING_PRECISION = 10;
const ISO_WEEKDAY_THURSDAY_OFFSET = 4;
const ISO_FIRST_WEEK_THRESHOLD = 1;
const MONDAY_AT_6PM_CRON = '0 18 * * 1';

@Injectable()
export class WeeklySummaryHandler {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: NotificationsServicePort,
  ) {}

  @Cron(MONDAY_AT_6PM_CRON)
  async sendWeeklySummary(): Promise<void> {
    const weekAgo = getWeekAgoDate();
    const userTokenMap = await this.buildUserTokenMap();
    const promises = Array.from(userTokenMap.entries()).map(
      ([oauthId, { tokens }]) =>
        this.sendSummaryForUser(oauthId, tokens, weekAgo),
    );
    await Promise.allSettled(promises);
  }

  private async buildUserTokenMap(): Promise<
    Map<string, { tokens: string[] }>
  > {
    const allTokens = await this.prisma.pushToken.findMany();
    const userMap = new Map<string, { tokens: string[] }>();
    for (const t of allTokens) {
      const existing = userMap.get(t.oauthId);
      if (existing) {
        existing.tokens.push(t.token);
      } else {
        userMap.set(t.oauthId, { tokens: [t.token] });
      }
    }
    return userMap;
  }

  private async sendSummaryForUser(
    oauthId: string,
    tokens: string[],
    weekAgo: Date,
  ): Promise<void> {
    const prefs = await this.prisma.notificationPreferences.findUnique({
      where: { oauthId },
    });
    if (prefs && !prefs.weeklySummary) return;

    const weeklyStats = await this.computeWeeklyStats(oauthId, weekAgo);
    const body =
      weeklyStats.gamesCompleted > 0
        ? `Tydzień ${getWeekNumber(new Date())} • Zagrałeś ${
            weeklyStats.totalHours
          }h • ${weeklyStats.gamesCompleted} ${pluralizePolish(
            weeklyStats.gamesCompleted,
            'gra ukończona',
            'gry ukończone',
            'gier ukończonych',
          )}`
        : `Tydzień ${getWeekNumber(new Date())} • Zagrałeś ${
            weeklyStats.totalHours
          }h`;

    await this.notificationsService.sendBulkPush(
      tokens,
      'Tygodniowe podsumowanie',
      body,
      {
        type: 'stats',
      },
    );
  }

  private async computeWeeklyStats(
    oauthId: string,
    weekAgo: Date,
  ): Promise<{ totalHours: number; gamesCompleted: number }> {
    const weeklyActivity = await this.prisma.userActivity.findMany({
      where: {
        oauthId,
        createdAt: { gte: weekAgo },
        activityType: 'COMPLETED',
      },
    });

    let totalHours = 0;
    for (const activity of weeklyActivity) {
      const status = await this.prisma.gamesStatus.findFirst({
        where: { oauthId, gameId: activity.gameId },
        include: { completedIn: true },
      });
      if (status?.completedIn) {
        totalHours += status.completedIn.hours || 0;
        totalHours += (status.completedIn.minutes || 0) / MINUTES_IN_HOUR;
      }
    }

    return {
      totalHours:
        Math.round(totalHours * ROUNDING_PRECISION) / ROUNDING_PRECISION,
      gamesCompleted: weeklyActivity.length,
    };
  }
}

export function getWeekAgoDate(): Date {
  const now = new Date();
  return new Date(now.getTime() - MS_IN_WEEK);
}

export function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || DAYS_IN_WEEK;
  d.setUTCDate(d.getUTCDate() + ISO_WEEKDAY_THURSDAY_OFFSET - dayNum);
  const yearStart = new Date(
    Date.UTC(d.getUTCFullYear(), 0, ISO_FIRST_WEEK_THRESHOLD),
  );
  return Math.ceil(
    ((d.getTime() - yearStart.getTime()) / MS_IN_DAY +
      ISO_FIRST_WEEK_THRESHOLD) /
      DAYS_IN_WEEK,
  );
}

export function pluralizePolish(
  count: number,
  singular: string,
  few: string,
  many: string,
): string {
  if (count === 1) return singular;
  if (count >= 2 && count <= 4) return few;
  return many;
}
