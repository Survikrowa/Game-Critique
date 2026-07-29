import { Injectable } from '@nestjs/common';
import { FriendStatsPort } from '../../domain/ports/friend-stats.port';
import { UserStatsService } from '../../../user_stats/user_stats.service';
import {
  FriendBacklogProgressDTO,
  FriendMonthlyActivityDTO,
  FriendStreakDTO,
  FriendYearlySummaryDTO,
} from '../graphql/friend_stats.dto';

@Injectable()
export class UserStatsServiceAdapter implements FriendStatsPort {
  constructor(private readonly userStatsService: UserStatsService) {}

  async getYearlySummary(
    year: number,
    oauthId: string,
  ): Promise<FriendYearlySummaryDTO> {
    return this.userStatsService.getYearlySummary({ year, oauthId });
  }

  async getMonthlyActivity(
    year: number,
    oauthId: string,
  ): Promise<FriendMonthlyActivityDTO[]> {
    return this.userStatsService.getMonthlyActivity({ year, oauthId });
  }

  async getStreak(oauthId: string): Promise<FriendStreakDTO> {
    return this.userStatsService.getStreak({ oauthId });
  }

  async getBacklogProgress(
    year: number,
    oauthId: string,
  ): Promise<FriendBacklogProgressDTO> {
    return this.userStatsService.getBacklogProgress({ year, oauthId });
  }
}
