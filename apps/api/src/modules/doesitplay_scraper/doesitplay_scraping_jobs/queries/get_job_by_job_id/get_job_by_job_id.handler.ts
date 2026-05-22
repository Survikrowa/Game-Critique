import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobByJobIdQuery } from './get_job_by_job_id.query';
import { PrismaService } from '../../../../database/prisma.service';

@QueryHandler(GetJobByJobIdQuery)
export class GetJobByJobIdQueryHandler
  implements IQueryHandler<GetJobByJobIdQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetJobByJobIdQuery) {
    return this.prismaService.doesItPlayScrapingJob.findUnique({
      where: { jobId: query.jobId },
    });
  }
}
