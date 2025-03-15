import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserByOauthId({ oauthId, options }: GetUserByOauthIdArgs) {
    return this.prismaService.user.findFirst({
      where: {
        oauthId,
      },
      include: {
        role: {
          include: {
            role: true,
          },
        },
        profile: true,
        GamesStatus: {
          include: {
            completedIn: true,
            platform: true,
            game: true,
          },
        },
        userActivity: {
          include: {
            game: {
              include: {
                cover: true,
              },
            },
          },
          take: options?.activityLimit,
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });
  }

  getAllUsers() {
    return this.prismaService.user.findMany({
      include: {
        profile: true,
        role: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}

type GetUserByOauthIdArgs = {
  oauthId: string;
  options?: {
    activityLimit?: number;
  };
};
