import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { DoesItPlayScrapingJobData } from './doesitplay_scraping_jobs.dto';
import { DoesItPlayScrapingJobsService } from './doesitplay_scraping_jobs.service';
import { DoesItPlayScraperFacade } from '../doesitplay_scraper.facade';

@Processor('doesItPlayScraping')
export class DoesItPlayScrapingJobsConsumer {
  private readonly logger = new Logger(DoesItPlayScrapingJobsConsumer.name);

  constructor(
    private readonly doesItPlayScrappingJobsService: DoesItPlayScrapingJobsService,
    private readonly doesItPlayScraperFacade: DoesItPlayScraperFacade,
  ) {}

  @Process('scrape')
  async scrape({ data, id }: Job<DoesItPlayScrapingJobData>) {
    this.logger.log(`Starting scraping job ${id}`);

    try {
      await this.doesItPlayScrappingJobsService.updateJobStatus(
        String(id),
        'IN_PROGRESS',
      );

      const game = await this.doesItPlayScraperFacade.searchGame(data.url);
      console.log(game);
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
