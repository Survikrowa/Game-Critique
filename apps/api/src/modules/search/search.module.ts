import { forwardRef, Module } from '@nestjs/common';
import { IgdbModule } from '../igdb/igdb.module';
import { SearchController } from './search.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [forwardRef(() => IgdbModule), forwardRef(() => DatabaseModule)],
  providers: [],
  exports: [],
  controllers: [SearchController],
})
export class SearchModule {}
