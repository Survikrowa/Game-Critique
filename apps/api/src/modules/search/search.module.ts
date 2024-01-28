import { forwardRef, Module } from '@nestjs/common';
import { IgdbModule } from '../igdb/igdb.module';
import { DatabaseModule } from '../database/database.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { GamesModule } from '../games/games.module';
import { HowLongToBeatParserModule } from '../howlongtobeat_parser/howlongtobeat_parser.module';

@Module({
  imports: [
    forwardRef(() => IgdbModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => GamesModule),
    forwardRef(() => HowLongToBeatParserModule),
  ],
  providers: [SearchResolver, SearchService],
  exports: [],
})
export class SearchModule {}
