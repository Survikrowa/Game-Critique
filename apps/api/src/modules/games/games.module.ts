import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesService } from './games.service';
import { BullModule } from '@nestjs/bull';
import { GamesRepository } from './games.repository';
import { GamesConsumer } from './games.consumer';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'games' }),
  ],
  providers: [GamesService, GamesRepository, GamesConsumer],
  exports: [GamesService],
})
export class GamesModule {}
