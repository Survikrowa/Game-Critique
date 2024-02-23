import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MigrationStatus } from '@prisma/client';

@Injectable()
export class HowLongToBeatMigrationStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  upsertMigrationStatus(oauthId: string, status: MigrationStatus) {
    return this.prismaService.howLongToBeatAccountMigrationStatus.upsert({
      where: {
        oauthId,
      },
      update: {
        status,
      },
      create: {
        oauthId,
        status,
      },
    });
  }

  getMigrationStatus(oauthId: string) {
    return this.prismaService.howLongToBeatAccountMigrationStatus.findUnique({
      where: {
        oauthId,
      },
    });
  }
}
