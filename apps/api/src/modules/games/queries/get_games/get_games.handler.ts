import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesQuery } from './get_games.query';
import { PrismaService } from '../../../database/prisma.service';

@QueryHandler(GetGamesQuery)
export class GetGamesQueryHandler implements IQueryHandler<GetGamesQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ skip = 0, take = 10, search }: GetGamesQuery) {
    return this.prismaService.game.findMany({
      where: {
        name: {
          contains: search ?? '',
          mode: 'insensitive',
        },
      },
      take,
      skip,
      select: {
        id: true,
        name: true,
        slug: true,
        hltbId: true,
      },
    });
  }
}
