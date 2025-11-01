import { Command } from '@nestjs/cqrs';
import { DoesItPlayScrapingJobData } from '../../doesitplay_scraping_jobs.dto';

export class CreateScrapingJobCommand extends Command<CreateScrapingJobCommandResponse> {
  constructor(public readonly data: DoesItPlayScrapingJobData) {
    super();
  }
}

type CreateScrapingJobCommandResponse = {
  id: number;
  url: string;
  jobId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
