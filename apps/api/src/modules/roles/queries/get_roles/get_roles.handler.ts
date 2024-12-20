import { QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery } from './get_roles.query';
import { PrismaService } from '../../../database/prisma.service';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler {
  constructor(private readonly prismaService: PrismaService) {}
  async execute() {
    return this.prismaService.role.findMany({
      select: { id: true, name: true },
    });
  }
}
