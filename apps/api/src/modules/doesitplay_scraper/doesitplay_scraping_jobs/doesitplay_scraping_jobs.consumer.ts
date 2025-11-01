import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { DoesItPlayScrapingJobData } from './doesitplay_scraping_jobs.dto';
import { DoesItPlayScrapingJobsService } from './doesitplay_scraping_jobs.service';

@Processor('doesItPlayScraping')
export class DoesItPlayScrapingJobsConsumer {
  private readonly logger = new Logger(DoesItPlayScrapingJobsConsumer.name);

  constructor(
    private readonly doesItPlayScrappingJobsService: DoesItPlayScrapingJobsService,
  ) {}

  @Process('scrape')
  async scrape({ data, id }: Job<DoesItPlayScrapingJobData>) {
    this.logger.log(`Starting scraping job ${id}`);

    try {
      await this.doesItPlayScrappingJobsService.updateJobStatus(
        String(id),
        'IN_PROGRESS',
      );

      // TODO: Implement actual scraping logic here
      // For now, this is just a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.doesItPlayScrappingJobsService.updateJobStatus(
        String(id),
        'COMPLETED',
      );

      this.logger.log(`Successfully completed scraping job ${id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to complete scraping job ${id}: ${errorMessage}`,
      );

      await this.doesItPlayScrappingJobsService.updateJobStatus(
        String(id),
        'FAILED',
      );
    }
  }
}
