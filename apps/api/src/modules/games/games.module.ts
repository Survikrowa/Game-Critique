import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesService } from './games.service';
import { BullModule } from '@nestjs/bull';
import { GamesRepository } from './games.repository';
import { GamesConsumer } from './games.consumer';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';
import { GamesResolver } from './games.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'games' }),
    HowLongToBeatParserModule,
    AuthModule,
  ],
  providers: [GamesService, GamesRepository, GamesConsumer, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
