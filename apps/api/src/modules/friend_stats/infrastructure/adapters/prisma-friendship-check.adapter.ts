import { Injectable } from '@nestjs/common';
import { FriendshipCheckPort } from '../../domain/ports/friendship-check.port';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PrismaFriendshipCheckAdapter implements FriendshipCheckPort {
  constructor(private readonly prisma: PrismaService) {}

  async areFriends(
    userOauthId: string,
    targetOauthId: string,
  ): Promise<boolean> {
    const friendsList = await this.prisma.friendsList.findFirst({
      where: { ownerId: userOauthId },
      include: {
        FriendsListForFriends: {
          where: { friend: { oauthId: targetOauthId } },
        },
      },
    });

    return (friendsList?.FriendsListForFriends.length ?? 0) > 0;
  }
}
