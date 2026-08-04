import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBacklogProgressQuery } from './get_backlog_progress.query';
import { PrismaService } from '../../../database/prisma.service';
import { BacklogProgressDTO } from '../../user_stats.dto';

@QueryHandler(GetBacklogProgressQuery)
export class GetBacklogProgressHandler
  implements IQueryHandler<GetBacklogProgressQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetBacklogProgressQuery): Promise<BacklogProgressDTO> {
    const { year, oauthId } = query;
    const yearStart = new Date(`${year}-01-01T00:00:00Z`);
    const yearEnd = new Date(`${year + 1}-01-01T00:00:00Z`);

    const [completed, added] = await Promise.all([
      this.prisma.gamesStatus.count({
        where: {
          user: { oauthId },
          status: 'COMPLETED',
          updatedAt: { gte: yearStart, lt: yearEnd },
        },
      }),
      this.prisma.gamesStatus.count({
        where: {
          user: { oauthId },
          status: 'BACKLOG',
          createdAt: { gte: yearStart, lt: yearEnd },
        },
      }),
    ]);

    const ratio =
      added > 0 ? Math.round((completed / (added + completed)) * 100) / 100 : 0;

    return { completed, added, ratio };
  }
}
