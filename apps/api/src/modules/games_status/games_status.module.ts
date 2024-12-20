import { forwardRef, Module } from '@nestjs/common';
import { GamesStatusResolver } from './games_status.resolver';
import { DatabaseModule } from '../database/database.module';
import { GamesStatusRepository } from './games_status.repository';
import { GamesStatusService } from './games_status.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => DatabaseModule), UsersModule, AuthModule],
  providers: [GamesStatusResolver, GamesStatusRepository, GamesStatusService],
  exports: [GamesStatusService, GamesStatusRepository],
})
export class GamesStatusModule {}
