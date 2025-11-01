import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobByUrlQuery } from './get_job_by_url.query';
import { PrismaService } from '../../../../database/prisma.service';

@QueryHandler(GetJobByUrlQuery)
export class GetJobByUrlQueryHandler
  implements IQueryHandler<GetJobByUrlQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetJobByUrlQuery) {
    return this.prismaService.doesItPlayScrapingJob.findUnique({
      where: { url: query.url },
    });
  }
}
