import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';
import { GamesResolver } from './games.resolver';
import { AuthModule } from '../auth/auth.module';
import { CommandHandlerType, CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { GetGamesQueryHandler } from './queries/get_games/get_games.handler';
import { UpdateGameDataHandler } from './commands/update_game_data/update_game_data.handler';
import { FetchGameRatingsHandler } from './commands/fetch_game_ratings/fetch_game_ratings.handler';
import { IgdbService } from '../../infrastructure/igdb/igdb.service';
import { IgdbRateLimiter } from '../../infrastructure/igdb/igdb_rate_limiter';
import { HttpModule } from '@nestjs/axios';
import { GetUpcomingGamesHandler } from './queries/get_upcoming_games/get_upcoming_games.handler';
import { CacheModule } from '@nestjs/cache-manager';
import { UpcomingGamesPreferencesFacade } from './services/upcoming-games-preferences.facade';
import { HltbGameProvider } from './infrastructure/adapters/hltb-game.provider';
import { IgdbGameProvider } from './infrastructure/adapters/igdb-game.provider';
import { PrismaGameSourceRepository } from './infrastructure/adapters/prisma-game-source.repository';
import { GameProviderRegistryService } from './infrastructure/adapters/game-provider.registry';
import { CompletionTimeFallbackService } from './application/services/completion_time_fallback.service';
import {
  GAME_PROVIDER_REGISTRY,
  HLTB_GAME_PROVIDER,
  IGDB_GAME_PROVIDER,
} from './domain/ports/game_provider.port';
import { GAME_SOURCE_REPOSITORY } from './domain/ports/game_source.repository.port';

const QueryHandlers: QueryHandlerType[] = [
  GetGamesQueryHandler,
  GetUpcomingGamesHandler,
];
const CommandHandlers: CommandHandlerType[] = [
  UpdateGameDataHandler,
  FetchGameRatingsHandler,
];

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    HowLongToBeatParserModule,
    AuthModule,
    CqrsModule,
    HttpModule,
    CacheModule.register(),
  ],
  providers: [
    GamesService,
    GamesRepository,
    GamesResolver,
    IgdbService,
    IgdbRateLimiter,
    UpcomingGamesPreferencesFacade,
    CompletionTimeFallbackService,
    HltbGameProvider,
    IgdbGameProvider,
    PrismaGameSourceRepository,
    GameProviderRegistryService,
    {
      provide: HLTB_GAME_PROVIDER,
      useExisting: HltbGameProvider,
    },
    {
      provide: IGDB_GAME_PROVIDER,
      useExisting: IgdbGameProvider,
    },
    {
      provide: GAME_SOURCE_REPOSITORY,
      useExisting: PrismaGameSourceRepository,
    },
    {
      provide: GAME_PROVIDER_REGISTRY,
      useExisting: GameProviderRegistryService,
    },
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [GamesService],
})
export class GamesModule {}
