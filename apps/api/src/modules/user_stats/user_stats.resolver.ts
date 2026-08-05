import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserStatsService } from './user_stats.service';
import {
  GetUserStatsArgs,
  UserStatsDTO,
  YearlySummaryDTO,
  GetYearlySummaryArgs,
  MonthlyActivityDTO,
  GetMonthlyActivityArgs,
  BacklogProgressDTO,
  GetBacklogProgressArgs,
  StreakDTO,
  HLTBComparisonDTO,
  GetHLTBComparisonArgs,
} from './user_stats.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../auth/infrastructure/graphql/auth.dto';

@Resolver()
export class UserStatsResolver {
  constructor(private readonly userStatsService: UserStatsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserStatsDTO], { name: 'userStats' })
  getUserStats(
    @User() user: UserAuthDTO,
    @Args() { type }: GetUserStatsArgs,
  ): Promise<UserStatsDTO[]> {
    return this.userStatsService.getUserStats({ type, oauthId: user.sub });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => YearlySummaryDTO, { name: 'yearlySummary' })
  getYearlySummary(
    @User() user: UserAuthDTO,
    @Args() { year }: GetYearlySummaryArgs,
  ): Promise<YearlySummaryDTO> {
    return this.userStatsService.getYearlySummary({
      year: year ?? null,
      oauthId: user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [MonthlyActivityDTO], { name: 'monthlyActivity' })
  getMonthlyActivity(
    @User() user: UserAuthDTO,
    @Args() { year }: GetMonthlyActivityArgs,
  ): Promise<MonthlyActivityDTO[]> {
    return this.userStatsService.getMonthlyActivity({
      year: year ?? null,
      oauthId: user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => BacklogProgressDTO, { name: 'backlogProgress' })
  getBacklogProgress(
    @User() user: UserAuthDTO,
    @Args() { year }: GetBacklogProgressArgs,
  ): Promise<BacklogProgressDTO> {
    return this.userStatsService.getBacklogProgress({
      year: year ?? null,
      oauthId: user.sub,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => StreakDTO, { name: 'streak' })
  getStreak(@User() user: UserAuthDTO): Promise<StreakDTO> {
    return this.userStatsService.getStreak({ oauthId: user.sub });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => HLTBComparisonDTO, { name: 'hltbComparison' })
  getHLTBComparison(
    @User() user: UserAuthDTO,
    @Args() { gameStatusId }: GetHLTBComparisonArgs,
  ): Promise<HLTBComparisonDTO> {
    return this.userStatsService.getHLTBComparison({
      gameStatusId,
      oauthId: user.sub,
    });
  }
}
