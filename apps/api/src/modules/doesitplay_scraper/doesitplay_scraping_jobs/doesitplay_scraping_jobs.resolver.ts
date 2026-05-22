import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import {
  DoesItPlayScrapingJob,
  CreateScrapingJobResponse,
} from './doesitplay_scraping_jobs.model';
import { DoesItPlayScrapingJobsService } from './doesitplay_scraping_jobs.service';
import { CreateScrapingJobInput } from './doesitplay_scraping_jobs.input';

@Resolver(() => DoesItPlayScrapingJob)
export class DoesItPlayScrapingJobsResolver {
  constructor(
    private readonly doesItPlayScrapingJobsService: DoesItPlayScrapingJobsService,
  ) {}

  @Mutation(() => CreateScrapingJobResponse)
  async createDoesItPlayScrapingJob(
    @Args('input') input: CreateScrapingJobInput,
  ) {
    const job =
      await this.doesItPlayScrapingJobsService.createScrapingJob(input);

    return {
      success: true,
      job,
    };
  }

  @Query(() => DoesItPlayScrapingJob, { nullable: true })
  async doesItPlayScrapingJobByUrl(@Args('url') url: string) {
    return this.doesItPlayScrapingJobsService.getJobByUrl(url);
  }

  @Query(() => DoesItPlayScrapingJob, { nullable: true })
  async doesItPlayScrapingJobByJobId(@Args('jobId') jobId: string) {
    return this.doesItPlayScrapingJobsService.getJobByJobId(jobId);
  }

  @Query(() => [DoesItPlayScrapingJob])
  async allDoesItPlayScrapingJobs() {
    return this.doesItPlayScrapingJobsService.getAllJobs();
  }
}
