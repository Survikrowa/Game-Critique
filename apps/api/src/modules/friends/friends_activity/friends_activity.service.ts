import { Injectable } from '@nestjs/common';
import { formatDateToRelativeText } from '../../dates/format_date_to_relative_text/format_date_to_relative_text';
import { QueryBus } from '@nestjs/cqrs';
import { GetFriendsActivityQuery } from './queries/get_friends_activity/get_friends_activity.query';
import { GetFriendsActivityReturn } from './queries/get_friends_activity/get_friends_activity.handler';

@Injectable()
export class FriendsActivityService {
  constructor(private readonly queryBus: QueryBus) {}

  async getFriendsActivity(oauthId: string) {
    const userFriendsActivity = await this.queryBus.execute<
      GetFriendsActivityQuery,
      GetFriendsActivityReturn
    >(new GetFriendsActivityQuery(oauthId));
    return this.mapFriendsActivityToDTO(userFriendsActivity);
  }

  mapFriendsActivityToDTO(userFriendsActivity: GetFriendsActivityReturn) {
    return userFriendsActivity?.friendsList?.FriendsListForFriends.map(
      (friends) => {
        return {
          user: {
            name: friends.friend.user.profile?.name,
            activity: this.mapActivityToDTO(
              friends.friend.user.userActivity,
              friends.friend.user.oauthId,
            ),
            oauthId: friends.friend.user.oauthId,
          },
        };
      },
    );
  }

  mapActivityToDTO(activity: Activity, oauthId: string) {
    return activity.map((activity) => {
      return {
        id: activity.id,
        oauthId: oauthId,
        game: activity.game,
        activityType: activity.activityType,
        updatedAt: activity.updatedAt,
        formattedUpdatedAt: formatDateToRelativeText(activity.updatedAt),
      };
    });
  }
}

type FriendsActivityReturn = NonNullable<GetFriendsActivityReturn>;
type FriendsListActivity = NonNullable<FriendsActivityReturn['friendsList']>;

type Activity =
  FriendsListActivity['FriendsListForFriends'][number]['friend']['user']['userActivity'];
