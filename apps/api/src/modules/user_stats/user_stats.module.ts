import { Module } from '@nestjs/common';
import { UserStatsService } from './user_stats.service';
import { UserStatsResolver } from './user_stats.resolver';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUserStatsByTypeQueryHandler } from './queries/get_all_user_stats_by_type/get_all_user_stats_by_type.handler';
import { GetYearlySummaryHandler } from './queries/get_yearly_summary/get_yearly_summary.handler';
import { GetMonthlyActivityHandler } from './queries/get_monthly_activity/get_monthly_activity.handler';
import { GetBacklogProgressHandler } from './queries/get_backlog_progress/get_backlog_progress.handler';
import { GetStreakHandler } from './queries/get_streak/get_streak.handler';
import { GetHLTBComparisonHandler } from './queries/get_hltb_comparison/get_hltb_comparison.handler';

const QueryHandlers = [
  GetAllUserStatsByTypeQueryHandler,
  GetYearlySummaryHandler,
  GetMonthlyActivityHandler,
  GetBacklogProgressHandler,
  GetStreakHandler,
  GetHLTBComparisonHandler,
];

@Module({
  imports: [DatabaseModule, AuthModule, CqrsModule],
  providers: [UserStatsResolver, UserStatsService, ...QueryHandlers],
})
export class UserStatsModule {}
