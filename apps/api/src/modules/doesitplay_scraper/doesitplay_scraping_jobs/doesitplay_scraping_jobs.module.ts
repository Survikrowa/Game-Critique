import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CqrsModule } from '@nestjs/cqrs';
import { DoesItPlayScrapingJobsService } from './doesitplay_scraping_jobs.service';
import { DoesItPlayScrapingJobsConsumer } from './doesitplay_scraping_jobs.consumer';
import { DoesItPlayScrapingJobsResolver } from './doesitplay_scraping_jobs.resolver';
import { DatabaseModule } from '../../database/database.module';
import { CreateScrapingJobCommandHandler } from './commands/create_scraping_job/create_scraping_job.handler';
import { UpdateJobStatusCommandHandler } from './commands/update_job_status/update_job_status.handler';
import { GetJobByUrlQueryHandler } from './queries/get_job_by_url/get_job_by_url.handler';
import { GetJobByJobIdQueryHandler } from './queries/get_job_by_job_id/get_job_by_job_id.handler';
import { GetAllJobsQueryHandler } from './queries/get_all_jobs/get_all_jobs.handler';
import { DoesItPlayScraperModule } from '../doesitplay_scraper.module';

const commandHandlers = [
  CreateScrapingJobCommandHandler,
  UpdateJobStatusCommandHandler,
];

const queryHandlers = [
  GetJobByUrlQueryHandler,
  GetJobByJobIdQueryHandler,
  GetAllJobsQueryHandler,
];

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({ name: 'doesItPlayScraping' }),
    DatabaseModule,
    DoesItPlayScraperModule,
  ],
  providers: [
    DoesItPlayScrapingJobsService,
    DoesItPlayScrapingJobsConsumer,
    DoesItPlayScrapingJobsResolver,

    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [DoesItPlayScrapingJobsService],
})
export class DoesItPlayScrapingJobsModule {}
