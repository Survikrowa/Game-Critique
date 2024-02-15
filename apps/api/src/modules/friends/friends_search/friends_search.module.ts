import { Module } from '@nestjs/common';
import { FriendsSearchResolver } from './friends_search.resolver';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [FriendsSearchResolver],
})
export class FriendsSearchModule {}
