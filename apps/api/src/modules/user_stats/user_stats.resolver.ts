import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserStatsService } from './user_stats.service';
import { GetUserStatsArgs, UserStatsDTO } from './user_stats.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/infrastructure/guards/auth-jwt.guard';
import { User } from '../auth/infrastructure/decorators/auth.decorators';
import { UserAuthDTO } from '../auth/infrastructure/graphql/auth.dto';

@Resolver()
export class UserStatsResolver {
  constructor(private readonly userStatsService: UserStatsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserStatsDTO], {
    name: 'userStats',
    description: 'Get user stats',
  })
  getUserStats(
    @User() user: UserAuthDTO,
    @Args() { type }: GetUserStatsArgs,
  ): Promise<UserStatsDTO[]> {
    return this.userStatsService.getUserStats({
      type,
      oauthId: user.sub,
    });
  }
}
