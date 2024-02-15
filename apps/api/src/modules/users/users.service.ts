import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as util from 'util';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
    console.log(util.inspect(users, false, null, true /* enable colors */));
    return users;
  }
}

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};
