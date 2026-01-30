import { PrismaService } from '../../../database/prisma.service';
import {
  GetLastEditedGamesQuery,
  GetLastEditedGamesQueryResponse,
} from './get_last_edited_games.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetLastEditedGamesQuery)
export class GetLastEditedGamesHandler
  implements
    IQueryHandler<GetLastEditedGamesQuery, GetLastEditedGamesQueryResponse[]>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: GetLastEditedGamesQuery,
  ): Promise<GetLastEditedGamesQueryResponse[]> {
    const { userId, limit } = query;
    const games = await this.prisma.gamesStatus.findMany({
      where: {
        user: {
          oauthId: userId,
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      select: {
        status: true,
        id: true,
        game: {
          select: {
            id: true,
            name: true,
            cover: true,
          },
        },
      },
    });
    console.log(games);
    return games.map((gs) => ({
      id: gs.id,
      name: gs.game.name,
      cover: gs.game.cover,
      status: gs.status,
    }));
  }
}
