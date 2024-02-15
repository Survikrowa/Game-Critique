import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FriendsListService } from '../friends_list/friends_list.service';

@Injectable()
export class FriendsRequestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly friendsList: FriendsListService,
  ) {}

  async createFriendRequest({ from, to }: CreateFriendRequestArgs) {
    return this.prismaService.friendsRequestsForUsers.create({
      data: {
        owner: {
          connect: {
            oauthId: from,
          },
        },
        receiver: {
          connect: {
            oauthId: to,
          },
        },
      },
    });
  }

  async acceptFriendRequest({ from, to }: AcceptFriendRequestArgs) {
    return this.prismaService.$transaction(async () => {
      const userFriendsList =
        await this.friendsList.findOrCreateUserFriendsList({
          oauthId: from,
        });

      const targetFriendsList =
        await this.friendsList.findOrCreateUserFriendsList({ oauthId: to });

      await this.removeFriendRequest({ from, to });

      await this.createFriendEntryInFriendsList({
        friendId: to,
        ownerFriendsListId: userFriendsList.id,
      });
      await this.createFriendEntryInFriendsList({
        friendId: from,
        ownerFriendsListId: targetFriendsList.id,
      });
      return { receiverId: to };
    });
  }

  async createFriendEntryInFriendsList({
    friendId,
    ownerFriendsListId,
  }: CreateFriendEntryInFriendsListArgs) {
    return this.prismaService.friendsListForFriends.create({
      data: {
        friendsList: {
          connect: {
            id: ownerFriendsListId,
          },
        },
        friend: {
          connectOrCreate: {
            where: {
              oauthId: friendId,
            },
            create: {
              oauthId: friendId,
            },
          },
        },
      },
    });
  }

  async removeFriendRequest({ from, to }: CreateFriendRequestArgs) {
    return this.prismaService.friendsRequestsForUsers.delete({
      where: {
        ownerId_receiverId: {
          ownerId: from,
          receiverId: to,
        },
      },
    });
  }

  async getFriendRequests({ oauthId }: { oauthId: string }) {
    const friendRequests =
      await this.prismaService.friendsRequestsForUsers.findMany({
        where: {
          receiverId: oauthId,
        },
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
        },
      });
    console.log(friendRequests);
    return friendRequests.map((request) => {
      return {
        senderOauthId: request.owner.oauthId,
        senderProfile: request.owner.profile,
      };
    });
  }
}

type AcceptFriendRequestArgs = {
  from: string;
  to: string;
};

type CreateFriendRequestArgs = {
  from: string;
  to: string;
};

type CreateFriendEntryInFriendsListArgs = {
  ownerFriendsListId: number;
  friendId: string;
};
