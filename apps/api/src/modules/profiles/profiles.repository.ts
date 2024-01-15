import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(userId: number) {
    return this.prismaService.profile.create({
      data: {
        avatarUrl:
          'http://res.cloudinary.com/survikrowa/image/upload/v1705345880/y5oklavnu42orgau8cyc.png"',
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
