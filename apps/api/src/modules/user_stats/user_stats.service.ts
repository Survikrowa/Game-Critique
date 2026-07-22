import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllUserStatsByTypeQuery } from './queries/get_all_user_stats_by_type/get_all_user_stats_by_type.query';
import { GetYearlySummaryQuery } from './queries/get_yearly_summary/get_yearly_summary.query';
import { GetMonthlyActivityQuery } from './queries/get_monthly_activity/get_monthly_activity.query';
import { GetBacklogProgressQuery } from './queries/get_backlog_progress/get_backlog_progress.query';
import { GetStreakQuery } from './queries/get_streak/get_streak.query';
import { GetHLTBComparisonQuery } from './queries/get_hltb_comparison/get_hltb_comparison.query';

@Injectable()
export class UserStatsService {
  constructor(private readonly queryBus: QueryBus) {}

  async getUserStats({ type, oauthId }: { type: string; oauthId: string }) {
    return this.queryBus.execute(new GetAllUserStatsByTypeQuery(type, oauthId));
  }

  async getYearlySummary({ year, oauthId }: { year: number; oauthId: string }) {
    return this.queryBus.execute(new GetYearlySummaryQuery(year, oauthId));
  }

  async getMonthlyActivity({
    year,
    oauthId,
  }: {
    year: number;
    oauthId: string;
  }) {
    return this.queryBus.execute(new GetMonthlyActivityQuery(year, oauthId));
  }

  async getBacklogProgress({
    year,
    oauthId,
  }: {
    year: number;
    oauthId: string;
  }) {
    return this.queryBus.execute(new GetBacklogProgressQuery(year, oauthId));
  }

  async getStreak({ oauthId }: { oauthId: string }) {
    return this.queryBus.execute(new GetStreakQuery(oauthId));
  }

  async getHLTBComparison({
    gameStatusId,
    oauthId,
  }: {
    gameStatusId: number;
    oauthId: string;
  }) {
    return this.queryBus.execute(
      new GetHLTBComparisonQuery(gameStatusId, oauthId),
    );
  }
}
