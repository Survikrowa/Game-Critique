import { forwardRef, Module } from '@nestjs/common';
import { GamesStatusResolver } from './games_status.resolver';
import { DatabaseModule } from '../database/database.module';
import { GamesStatusRepository } from './games_status.repository';
import { GamesStatusService } from './games_status.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [GamesStatusResolver, GamesStatusRepository, GamesStatusService],
})
export class GamesStatusModule {}
