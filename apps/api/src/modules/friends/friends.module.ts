import { Module } from '@nestjs/common';
import { FriendsListModule } from './friends_list/friends_list.module';
import { FriendsSearchModule } from './friends_search/friends_search.module';
import { FriendsRequestsModule } from './friends_requests/friends_requests.module';
import { FriendsActivityModule } from './friends_activity/friends_activity.module';

@Module({
  imports: [
    FriendsListModule,
    FriendsSearchModule,
    FriendsRequestsModule,
    FriendsActivityModule,
  ],
  exports: [
    FriendsListModule,
    FriendsSearchModule,
    FriendsRequestsModule,
    FriendsActivityModule,
  ],
})
export class FriendsModule {}
