import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as util from 'util';
import { PrismaService } from '../database/prisma.service';
import { formatDateToRelativeText } from '../dates/format_date_to_relative_text/format_date_to_relative_text';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async findUsersToAddAsFriends({
    oauthId,
    username,
  }: FindUsersToAddAsFriendsArgs) {
    const users = (
      await this.usersRepository.findUsersToAddAsFriends({
        oauthId,
        username,
      })
    )
      .filter((user) => {
        return !user.friendsList?.FriendsListForFriends.find(
          (friend) => friend.friend.oauthId === oauthId,
        );
      })
      .map((user) => {
        return {
          ...user,
          isFriendRequestSent: user.FriendsRequestsForUsersReceiver.length > 0,
        };
      });
    return users;
  }

  async getUser(
    oauthId: string,
    options?: {
      activityLimit?: number;
    },
  ) {
    const user = await this.prismaService.user.findFirst({
      where: {
        oauthId,
      },
      include: {
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
    if (!user) {
      return null;
    }

    return {
      ...user,
      userActivity: user.userActivity.map((activity) => {
        return {
          ...activity,
          formattedUpdatedAt: formatDateToRelativeText(
            dayjs(activity.updatedAt),
          ),
        };
      }),
      gamesStatus: user.GamesStatus.map((gameStatus) => {
        return {
          ...gameStatus,
          gameStatus: gameStatus.status,
        };
      }),
    };
  }
}

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};
