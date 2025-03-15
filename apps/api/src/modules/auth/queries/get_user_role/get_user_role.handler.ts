import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserRoleQuery } from './get_user_role.query';
import { PrismaService } from '../../../database/prisma.service';

@QueryHandler(GetUserRoleQuery)
export class GetUserRoleQueryHandler
  implements IQueryHandler<GetUserRoleQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetUserRoleQuery) {
    const { oauthId } = query;
    const userRole = await this.getUserRole(oauthId);
    return {
      role: userRole?.role.name,
    };
  }

  async getUserRole(oauthId: string) {
    return this.prismaService.userRole.findFirst({
      where: {
        oauthId,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
