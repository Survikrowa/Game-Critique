import { Injectable } from '@nestjs/common';
import { FriendsListRepository } from './friends_list.repository';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FriendsListService {
  constructor(
    private readonly friendsListRepository: FriendsListRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async getFriendsList(oauthId: string) {
    const friends = await this.friendsListRepository.getFriends(oauthId);
    if (friends) {
      return friends.FriendsListForFriends.map((friend) => ({
        id: friend.friend.user.oauthId,
        name: friend.friend.user?.profile?.name,
        avatarUrl: friend.friend.user?.profile?.avatarUrl,
      }));
    }
    return [];
  }

  async findOrCreateUserFriendsList({ oauthId }: { oauthId: string }) {
    return this.prismaService.friendsList.upsert({
      where: {
        ownerId: oauthId,
      },
      create: {
        ownerId: oauthId,
      },
      update: {},
    });
  }
}
