import { Module } from '@nestjs/common';
import { FriendsListModule } from './friends_list/friends_list.module';
import { FriendsSearchModule } from './friends_search/friends_search.module';
import { FriendsRequestsModule } from './friends_requests/friends_requests.module';

@Module({
  imports: [FriendsListModule, FriendsSearchModule, FriendsRequestsModule],
  exports: [FriendsListModule, FriendsSearchModule, FriendsRequestsModule],
})
export class FriendsModule {}
