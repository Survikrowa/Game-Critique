import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { formatDateToRelativeText } from '../../dates/format_date_to_relative_text/format_date_to_relative_text';
import dayjs from 'dayjs';

@Injectable()
export class FriendsActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriendsActivity(oauthId: string) {
    const userFriendsActivity = await this.prismaService.user.findFirst({
      where: {
        oauthId,
      },
      include: {
        friendsList: {
          include: {
            FriendsListForFriends: {
              include: {
                friend: {
                  include: {
                    user: {
                      include: {
                        userActivity: {
                          take: 1,
                          include: {
                            game: {
                              include: {
                                cover: true,
                              },
                            },
                          },
                          orderBy: {
                            updatedAt: 'desc',
                          },
                        },
                        profile: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      take: 5,
    });
    return userFriendsActivity?.friendsList?.FriendsListForFriends.map(
      (friends) => {
        return {
          user: {
            name: friends.friend.user.profile?.name,
            activity: friends.friend.user.userActivity.map((activity) => {
              return {
                id: activity.id,
                oauthId: friends.friend.user.oauthId,
                game: activity.game,
                activityType: activity.activityType,
                updatedAt: activity.updatedAt,
                formattedUpdatedAt: formatDateToRelativeText(
                  dayjs(activity.updatedAt),
                ),
              };
            }),
            oauthId: friends.friend.user.oauthId,
          },
        };
      },
    );
  }
}
