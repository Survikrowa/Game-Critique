import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UserStatsModule } from '../user_stats/user_stats.module';
import { FRIEND_STATS_PORT } from './domain/ports/friend-stats.port';
import { FRIENDSHIP_CHECK_PORT } from './domain/ports/friendship-check.port';
import { UserStatsServiceAdapter } from './infrastructure/adapters/user-stats-service.adapter';
import { PrismaFriendshipCheckAdapter } from './infrastructure/adapters/prisma-friendship-check.adapter';
import { FriendStatsResolver } from './infrastructure/graphql/friend_stats.resolver';

@Module({
  imports: [AuthModule, DatabaseModule, UserStatsModule],
  providers: [
    FriendStatsResolver,
    {
      provide: FRIEND_STATS_PORT,
      useClass: UserStatsServiceAdapter,
    },
    {
      provide: FRIENDSHIP_CHECK_PORT,
      useClass: PrismaFriendshipCheckAdapter,
    },
  ],
})
export class FriendStatsModule {}
