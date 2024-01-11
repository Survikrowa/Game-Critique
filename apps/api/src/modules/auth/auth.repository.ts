import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(oauthId: string) {
    return this.prismaService.user.create({
      data: {
        oauthId,
      },
    });
  }
}
