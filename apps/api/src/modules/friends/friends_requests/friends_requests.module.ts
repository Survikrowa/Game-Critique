import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FriendsRequestsService } from './friends_requests.service';
import { FriendsRequestsResolver } from './friends_requests.resolver';
import { FriendsListModule } from '../friends_list/friends_list.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    forwardRef(() => FriendsListModule),
  ],
  providers: [FriendsRequestsService, FriendsRequestsResolver],
})
export class FriendsRequestsModule {}
