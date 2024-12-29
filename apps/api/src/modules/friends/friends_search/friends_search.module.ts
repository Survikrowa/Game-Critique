import { Module } from '@nestjs/common';
import { FriendsSearchResolver } from './friends_search.resolver';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [FriendsSearchResolver],
})
export class FriendsSearchModule {}
