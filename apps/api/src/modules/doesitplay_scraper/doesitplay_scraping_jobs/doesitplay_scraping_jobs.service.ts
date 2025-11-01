import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DoesItPlayScrapingJobData } from './doesitplay_scraping_jobs.dto';
import { DoesItPlayJobStatus } from '@prisma/client';
import { CreateScrapingJobCommand } from './commands/create_scraping_job/create_scraping_job.command';
import { UpdateJobStatusCommand } from './commands/update_job_status/update_job_status.command';
import { GetJobByUrlQuery } from './queries/get_job_by_url/get_job_by_url.query';
import { GetJobByJobIdQuery } from './queries/get_job_by_job_id/get_job_by_job_id.query';
import { GetAllJobsQuery } from './queries/get_all_jobs/get_all_jobs.query';

@Injectable()
export class DoesItPlayScrapingJobsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createScrapingJob(data: DoesItPlayScrapingJobData) {
    return this.commandBus.execute(new CreateScrapingJobCommand(data));
  }

  async getJobByUrl(url: string) {
    return this.queryBus.execute(new GetJobByUrlQuery(url));
  }

  async getJobByJobId(jobId: string) {
    return this.queryBus.execute(new GetJobByJobIdQuery(jobId));
  }

  async updateJobStatus(
    jobId: string,
    status: DoesItPlayJobStatus,
    error?: string,
  ) {
    return this.commandBus.execute(
      new UpdateJobStatusCommand(jobId, status, error),
    );
  }

  async getAllJobs() {
    return this.queryBus.execute(new GetAllJobsQuery());
  }
}
