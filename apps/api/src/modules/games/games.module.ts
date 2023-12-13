import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesService } from './games.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
