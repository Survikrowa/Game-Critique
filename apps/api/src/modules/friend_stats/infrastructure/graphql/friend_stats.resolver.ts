import { ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../../../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../../../auth/infrastructure/graphql/auth.dto';
import {
  FRIEND_STATS_PORT,
  FriendStatsPort,
} from '../../domain/ports/friend-stats.port';
import {
  FRIENDSHIP_CHECK_PORT,
  FriendshipCheckPort,
} from '../../domain/ports/friendship-check.port';
import {
  FriendBacklogProgressDTO,
  FriendMonthlyActivityDTO,
  FriendStreakDTO,
  FriendYearlySummaryDTO,
  GetFriendBacklogProgressArgs,
  GetFriendMonthlyActivityArgs,
  GetFriendStreakArgs,
  GetFriendYearlySummaryArgs,
} from './friend_stats.dto';

@Resolver()
export class FriendStatsResolver {
  constructor(
    @Inject(FRIEND_STATS_PORT)
    private readonly friendStatsPort: FriendStatsPort,
    @Inject(FRIENDSHIP_CHECK_PORT)
    private readonly friendshipCheckPort: FriendshipCheckPort,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => FriendYearlySummaryDTO, { name: 'friendYearlySummary' })
  async getFriendYearlySummary(
    @User() user: UserAuthDTO,
    @Args() { oauthId, year }: GetFriendYearlySummaryArgs,
  ): Promise<FriendYearlySummaryDTO> {
    const areFriends = await this.friendshipCheckPort.areFriends(
      user.sub,
      oauthId,
    );
    if (!areFriends) {
      throw new ForbiddenException('Nie jesteście znajomymi');
    }
    return this.friendStatsPort.getYearlySummary(year ?? null, oauthId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [FriendMonthlyActivityDTO], { name: 'friendMonthlyActivity' })
  async getFriendMonthlyActivity(
    @User() user: UserAuthDTO,
    @Args() { oauthId, year }: GetFriendMonthlyActivityArgs,
  ): Promise<FriendMonthlyActivityDTO[]> {
    const areFriends = await this.friendshipCheckPort.areFriends(
      user.sub,
      oauthId,
    );
    if (!areFriends) {
      throw new ForbiddenException('Nie jesteście znajomymi');
    }
    return this.friendStatsPort.getMonthlyActivity(year ?? null, oauthId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => FriendStreakDTO, { name: 'friendStreak' })
  async getFriendStreak(
    @User() user: UserAuthDTO,
    @Args() { oauthId }: GetFriendStreakArgs,
  ): Promise<FriendStreakDTO> {
    const areFriends = await this.friendshipCheckPort.areFriends(
      user.sub,
      oauthId,
    );
    if (!areFriends) {
      throw new ForbiddenException('Nie jesteście znajomymi');
    }
    return this.friendStatsPort.getStreak(oauthId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => FriendBacklogProgressDTO, { name: 'friendBacklogProgress' })
  async getFriendBacklogProgress(
    @User() user: UserAuthDTO,
    @Args() { oauthId, year }: GetFriendBacklogProgressArgs,
  ): Promise<FriendBacklogProgressDTO> {
    const areFriends = await this.friendshipCheckPort.areFriends(
      user.sub,
      oauthId,
    );
    if (!areFriends) {
      throw new ForbiddenException('Nie jesteście znajomymi');
    }
    return this.friendStatsPort.getBacklogProgress(year ?? null, oauthId);
  }
}
