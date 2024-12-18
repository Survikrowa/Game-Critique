import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PrismaPromise, RoleEnum } from '@prisma/client';
@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUsersToAddAsFriends({
    oauthId,
    username,
  }: FindUsersToAddAsFriendsArgs) {
    return this.prismaService.user.findMany({
      where: {
        profile: {
          name: {
            contains: username.toLowerCase(),
          },
        },
        NOT: {
          oauthId,
        },
      },
      include: {
        role: {
          include: {
            role: true,
          },
        },
        FriendsRequestsForUsersReceiver: {
          where: {
            ownerId: oauthId,
          },
        },
        profile: true,
        friendsList: {
          include: {
            FriendsListForFriends: {
              include: {
                friend: true,
              },
            },
          },
        },
      },
    });
  }

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

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};

type GetUserByOauthIdArgs = {
  oauthId: string;
  options?: {
    activityLimit?: number;
  };
};
