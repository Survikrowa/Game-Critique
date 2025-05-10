import { Module } from '@nestjs/common';
import { UserStatsService } from './user_stats.service';
import { UserStatsResolver } from './user_stats.resolver';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUserStatsByTypeQueryHandler } from './queries/get_all_user_stats_by_type/get_all_user_stats_by_type.handler';

const QueryHandlers = [GetAllUserStatsByTypeQueryHandler];

@Module({
  imports: [DatabaseModule, AuthModule, CqrsModule],
  providers: [UserStatsResolver, UserStatsService, ...QueryHandlers],
})
export class UserStatsModule {}
