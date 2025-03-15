import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersToAddAsFriendsQuery } from './find_users_to_add_as_friends.query';
import { PrismaService } from '../../../../database/prisma.service';
import { Prisma } from '@prisma/client';
@QueryHandler(FindUsersToAddAsFriendsQuery)
export class FindUsersToAddAsFriendsHandler
  implements IQueryHandler<FindUsersToAddAsFriendsQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    query: FindUsersToAddAsFriendsQuery,
  ): Promise<FindUsersAddAsFriendsResult> {
    return this.findUsersToAddAsFriends(query);
  }

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
      select: {
        id: true,
        oauthId: true,
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

export type FindUsersAddAsFriendsResult = Prisma.PromiseReturnType<
  FindUsersToAddAsFriendsHandler['findUsersToAddAsFriends']
>;
