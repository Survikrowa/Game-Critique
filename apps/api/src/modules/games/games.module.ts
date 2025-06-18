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

const QueryHandlers: QueryHandlerType[] = [GetGamesQueryHandler];
const CommandHandlers: CommandHandlerType[] = [UpdateGameDataHandler];

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    BullModule.registerQueue({ name: 'games' }),
    HowLongToBeatParserModule,
    AuthModule,
    CqrsModule,
  ],
  providers: [
    GamesService,
    GamesRepository,
    GamesConsumer,
    GamesResolver,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [GamesService],
})
export class GamesModule {}
