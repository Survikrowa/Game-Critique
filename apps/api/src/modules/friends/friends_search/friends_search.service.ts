import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUsersToAddAsFriendsQuery } from './queries/find_users_to_add_as_friends/find_users_to_add_as_friends.query';
import { FindUsersAddAsFriendsResult } from './queries/find_users_to_add_as_friends/find_users_to_add_as_friends.handler';
import { UserSearchResultDTO } from './friends_resolver.dto';

@Injectable()
export class FriendsSearchService {
  constructor(private readonly queryBus: QueryBus) {}
  async findUsersToAddAsFriends({
    oauthId,
    username,
  }: FindUsersToAddAsFriendsArgs): Promise<UserSearchResultDTO[]> {
    const users = await this.queryBus.execute<
      FindUsersToAddAsFriendsQuery,
      FindUsersAddAsFriendsResult
    >(new FindUsersToAddAsFriendsQuery(oauthId, username));

    return users
      .filter((user) => {
        return this.filterFriendsAlreadyOnList({
          oauthId,
          friendsList: user.friendsList,
        });
      })
      .map((user) => {
        return this.mapUserToUserSearchDTO(user);
      });
  }

  filterFriendsAlreadyOnList({
    oauthId,
    friendsList,
  }: FilterFriendsAlreadyOnListArgs) {
    return !friendsList?.FriendsListForFriends.find(
      (friend) => friend.friend.oauthId === oauthId,
    );
  }

  mapUserToUserSearchDTO(user: FindUsersAddAsFriendsResult[number]) {
    return {
      ...user,
      id: user.id,
      oauthId: user.oauthId,
      role: user.role?.role.name,
      isFriendRequestSent: user.FriendsRequestsForUsersReceiver.length > 0,
    };
  }
}

type FilterFriendsAlreadyOnListArgs = {
  oauthId: string;
  friendsList: FindUsersAddAsFriendsResult[number]['friendsList'];
};

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};
