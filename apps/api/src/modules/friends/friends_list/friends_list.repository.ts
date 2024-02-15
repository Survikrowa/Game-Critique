import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FriendsListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getFriends(oauthId: string) {
    return this.prismaService.friendsList.findFirst({
      where: {
        ownerId: oauthId,
      },
      include: {
        FriendsListForFriends: {
          select: {
            friend: {
              include: {
                user: {
                  include: {
                    profile: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
