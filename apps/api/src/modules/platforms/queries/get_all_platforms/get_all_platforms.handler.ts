import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPlatformsQuery } from './get_all_platforms.query';
import { PrismaService } from '../../../database/prisma.service';

@QueryHandler(GetAllPlatformsQuery)
export class GetAllPlatformsQueryHandler
  implements IQueryHandler<GetAllPlatformsQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    return this.getAllPlatforms();
  }

  async getAllPlatforms() {
    return this.prismaService.platform.findMany();
  }
}
