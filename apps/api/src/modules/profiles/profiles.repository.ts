import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(userId: number, username: string) {
    return this.prismaService.profile.create({
      data: {
        avatarUrl:
          'http://res.cloudinary.com/survikrowa/image/upload/v1705345880/y5oklavnu42orgau8cyc.png',
        name: username,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getProfileInfo(oauthUserId: string) {
    return this.prismaService.profile.findFirst({
      where: {
        oauthId: oauthUserId,
      },
    });
  }
}
