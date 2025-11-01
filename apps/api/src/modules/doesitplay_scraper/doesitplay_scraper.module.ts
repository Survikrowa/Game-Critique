import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DoesItPlayService } from './doesitplay_scraper.service';
import { DoesItPlayScrapperService } from './doesitplay_scrapper/doesitplay_scrapper.service';
import { DoesItPlayScraperFacade } from './doesitplay_scraper.facade';
import { DoesItPlayResolver } from './doesitplay_scraper.resolver';
import { DoesItPlayScrapingJobsModule } from './doesitplay_scraping_jobs/doesitplay_scraping_jobs.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    DoesItPlayScrapingJobsModule,
  ],
  providers: [
    DoesItPlayService,
    DoesItPlayScrapperService,
    DoesItPlayScraperFacade,
    DoesItPlayResolver,
  ],
  exports: [DoesItPlayScraperFacade, DoesItPlayScrapingJobsModule],
})
export class DoesItPlayScraperModule {}
