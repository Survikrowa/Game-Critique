import { forwardRef, Module } from '@nestjs/common';
import { IgdbModule } from '../igdb/igdb.module';
import { DatabaseModule } from '../database/database.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { GamesModule } from '../games/games.module';
import { ConfigModule } from '@nestjs/config';
import { FetchGamesFromHltbQueryHandler } from './queries/fetch_games_from_hltb.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';

const handlers = [FetchGamesFromHltbQueryHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    forwardRef(() => IgdbModule),
    forwardRef(() => DatabaseModule),
    GamesModule,
    forwardRef(() => HowLongToBeatParserModule),
  ],
  providers: [SearchResolver, SearchService, ...handlers],
  exports: [SearchService],
})
export class SearchModule {}
