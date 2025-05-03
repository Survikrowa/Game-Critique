import { QueryHandler } from '@nestjs/cqrs';
import { GetFriendsActivityQuery } from './get_friends_activity.query';
import { PrismaService } from '../../../../database/prisma.service';
import { Prisma } from '@prisma/client';

@QueryHandler(GetFriendsActivityQuery)
export class GetFriendsActivityHandler {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    query: GetFriendsActivityQuery,
  ): Promise<GetFriendsActivityReturn> {
    const { oauthId } = query;
    return this.getFriendsActivity(oauthId);
  }

  async getFriendsActivity(oauthId: string) {
    return this.prismaService.user.findFirst({
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
  }
}

export type GetFriendsActivityReturn = Prisma.PromiseReturnType<
  GetFriendsActivityHandler['getFriendsActivity']
>;
