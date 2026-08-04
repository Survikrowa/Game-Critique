import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FriendsListService } from '../friends_list/friends_list.service';
import { EventBus } from '@nestjs/cqrs';
import { FriendRequestAcceptedEvent } from '../../notifications/application/events/friend_request_accepted.event';
import { FriendRequestReceivedEvent } from '../../notifications/application/events/friend_request_received.event';

@Injectable()
export class FriendsRequestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly friendsList: FriendsListService,
    private readonly eventBus: EventBus,
  ) {}

  async createFriendRequest({ from, to }: CreateFriendRequestArgs) {
    const result = await this.prismaService.friendsRequestsForUsers.create({
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

    const senderName = await this.getProfileName(from);
    this.eventBus.publish(new FriendRequestReceivedEvent(from, senderName, to));

    return result;
  }

  async acceptFriendRequest({ from, to }: AcceptFriendRequestArgs) {
    const result = await this.prismaService.$transaction(async () => {
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

    const requesterName = await this.getProfileName(from);
    const accepterName = await this.getProfileName(to);
    this.eventBus.publish(
      new FriendRequestAcceptedEvent(from, requesterName, to, accepterName),
    );

    return result;
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
    return friendRequests.map((request) => {
      return {
        senderOauthId: request.owner.oauthId,
        senderProfile: request.owner.profile,
      };
    });
  }

  private async getProfileName(oauthId: string): Promise<string> {
    const profile = await this.prismaService.profile.findUnique({
      where: { oauthId },
      select: { name: true },
    });
    return profile?.name ?? '';
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
