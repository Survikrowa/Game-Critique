import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
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
}

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};
