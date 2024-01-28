import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HowLongToBeatService } from './howlongtobeat_parser.service';
import { HowLongToBeatScrapperService } from './howlongtobeat_parser_scrapper/howlongtobeat_parser_scrapper.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://howlongtobeat.com',
    }),
  ],
  providers: [HowLongToBeatService, HowLongToBeatScrapperService],
  exports: [HowLongToBeatService],
})
export class HowLongToBeatParserModule {}
