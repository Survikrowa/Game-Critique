import { forwardRef, Module } from '@nestjs/common';
import { IgdbModule } from '../igdb/igdb.module';
import { SearchController } from './search.controller';
import { DatabaseModule } from '../database/database.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [
    forwardRef(() => IgdbModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => GamesModule),
  ],
  providers: [SearchResolver, SearchService],
  exports: [],
  controllers: [SearchController],
})
export class SearchModule {}
