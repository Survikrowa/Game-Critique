import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateScrapingJobCommand } from './create_scraping_job.command';
import { PrismaService } from '../../../../database/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DoesItPlayScrapingJobData } from '../../doesitplay_scraping_jobs.dto';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateScrapingJobCommand)
export class CreateScrapingJobCommandHandler
  implements ICommandHandler<CreateScrapingJobCommand>
{
  private readonly logger = new Logger(CreateScrapingJobCommandHandler.name);

  constructor(
    private readonly prismaService: PrismaService,
    @InjectQueue('doesItPlayScraping')
    private doesItPlayScrapingQueue: Queue<DoesItPlayScrapingJobData>,
  ) {}

  async execute(command: CreateScrapingJobCommand) {
    const { data } = command;
    this.logger.log(`Creating scraping job`);

    const existingJob =
      await this.prismaService.doesItPlayScrapingJob.findUnique({
        where: { url: data.url },
      });

    if (existingJob) {
      this.logger.log(`Job already exists for URL: ${data.url}`);
      return existingJob;
    }

    const job = await this.doesItPlayScrapingQueue.add('scrape', data);

    const scrapingJob = await this.prismaService.doesItPlayScrapingJob.create({
      data: {
        url: data.url,
        jobId: String(job.id),
        status: 'PENDING',
      },
    });

    this.logger.log(`Created scraping job with ID: ${scrapingJob.jobId}`);
    return scrapingJob;
  }
}
