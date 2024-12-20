import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { formatDateToRelativeText } from '../dates/format_date_to_relative_text/format_date_to_relative_text';
import dayjs from 'dayjs';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/get_users/get_users.query';
import { UserDataDTO, UserDTO } from './users.dto';
import { GetUserQuery } from './queries/get_user/get_user.query';
import { GetAllUsersWithProfileReturn, GetUserReturn } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly queryBus: QueryBus,
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
          role: user.role?.role.name,
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
  ): Promise<UserDataDTO | null> {
    const user = await this.queryBus.execute<GetUserQuery, GetUserReturn>(
      new GetUserQuery(oauthId, options),
    );
    if (!user) {
      return null;
    }

    return {
      ...user,
      userActivity: this.mapUserActivityToUserDTO(user.userActivity),
      gamesStatus: this.mapGamesStatusToUserDTO(user.GamesStatus),
    };
  }

  private mapUserActivityToUserDTO(
    userActivity: GetUserReturn['userActivity'],
  ) {
    return userActivity.map((activity) => {
      return {
        ...activity,
        formattedUpdatedAt: formatDateToRelativeText(dayjs(activity.updatedAt)),
      };
    });
  }

  private mapGamesStatusToUserDTO(gamesStatus: GetUserReturn['GamesStatus']) {
    return gamesStatus.map((gameStatus) => {
      return {
        ...gameStatus,
        gameStatus: gameStatus.status,
      };
    });
  }

  async getAllUsersWithProfile(): Promise<UserDTO[]> {
    const users = await this.queryBus.execute<
      GetUsersQuery,
      GetAllUsersWithProfileReturn[]
    >(new GetUsersQuery());

    return this.mapUsersToUserDTO(users);
  }

  private mapUsersToUserDTO(users: GetAllUsersWithProfileReturn[]): UserDTO[] {
    return users.map((user) => ({
      id: user.id,
      profile: user.profile
        ? {
            name: user.profile.name || null,
            avatarUrl: user.profile?.avatarUrl || '',
            id: user.profile.id,
          }
        : null,
      role: user.role?.role.name,
      oauthId: user.oauthId,
    }));
  }
}

type FindUsersToAddAsFriendsArgs = {
  oauthId: string;
  username: string;
};
