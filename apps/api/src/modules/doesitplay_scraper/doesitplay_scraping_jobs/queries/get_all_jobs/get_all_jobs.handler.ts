import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllJobsQuery } from './get_all_jobs.query';
import { PrismaService } from '../../../../database/prisma.service';

@QueryHandler(GetAllJobsQuery)
export class GetAllJobsQueryHandler implements IQueryHandler<GetAllJobsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    return this.prismaService.doesItPlayScrapingJob.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
