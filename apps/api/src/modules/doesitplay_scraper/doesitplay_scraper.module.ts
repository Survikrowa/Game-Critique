import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DoesItPlayService } from './doesitplay_scraper.service';
import { DoesItPlayScraperFacade } from './doesitplay_scraper.facade';
import { DoesItPlayResolver } from './doesitplay_scraper.resolver';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [DoesItPlayService, DoesItPlayScraperFacade, DoesItPlayResolver],
  exports: [DoesItPlayScraperFacade],
})
export class DoesItPlayScraperModule {}
