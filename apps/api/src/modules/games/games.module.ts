import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesService } from './games.service';
import { BullModule } from '@nestjs/bull';
import { GamesRepository } from './games.repository';
import { GamesConsumer } from './games.consumer';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';
import { GamesResolver } from './games.resolver';
import { AuthModule } from '../auth/auth.module';
import { CommandHandlerType, CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { GetGamesQueryHandler } from './queries/get_games/get_games.handler';
import { UpdateGameDataHandler } from './commands/update_game_data/update_game_data.handler';
import { IgdbService } from '../../infrastructure/igdb/igdb.service';
import { HttpModule } from '@nestjs/axios';
import { GetUpcomingGamesHandler } from './queries/get_upcoming_games/get_upcoming_games.handler';
import { CacheModule } from '@nestjs/cache-manager';

const QueryHandlers: QueryHandlerType[] = [
  GetGamesQueryHandler,
  GetUpcomingGamesHandler,
];
const CommandHandlers: CommandHandlerType[] = [UpdateGameDataHandler];

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'games' }),
    HowLongToBeatParserModule,
    AuthModule,
    CqrsModule,
    HttpModule,
    CacheModule.register(),
  ],
  providers: [
    GamesService,
    GamesRepository,
    GamesConsumer,
    GamesResolver,
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: 'GAMES_PROVIDER',
      useClass: IgdbService,
    },
  ],
  exports: [GamesService],
})
export class GamesModule {}
