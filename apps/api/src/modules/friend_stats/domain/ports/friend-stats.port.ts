import {
  FriendBacklogProgressDTO,
  FriendMonthlyActivityDTO,
  FriendStreakDTO,
  FriendYearlySummaryDTO,
} from '../../infrastructure/graphql/friend_stats.dto';

export const FRIEND_STATS_PORT = Symbol('FRIEND_STATS_PORT');

export interface FriendStatsPort {
  getYearlySummary(
    year: number | null,
    oauthId: string,
  ): Promise<FriendYearlySummaryDTO>;
  getMonthlyActivity(
    year: number | null,
    oauthId: string,
  ): Promise<FriendMonthlyActivityDTO[]>;
  getStreak(oauthId: string): Promise<FriendStreakDTO>;
  getBacklogProgress(
    year: number | null,
    oauthId: string,
  ): Promise<FriendBacklogProgressDTO>;
}
