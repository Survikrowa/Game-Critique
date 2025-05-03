import { Module } from '@nestjs/common';
import { FriendsSearchResolver } from './friends_search.resolver';
import { AuthModule } from '../../auth/auth.module';
import { FindUsersToAddAsFriendsHandler } from './queries/find_users_to_add_as_friends/find_users_to_add_as_friends.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FriendsSearchService } from './friends_search.service';
import { DatabaseModule } from '../../database/database.module';

const handlers = [FindUsersToAddAsFriendsHandler];

@Module({
  imports: [CqrsModule, AuthModule, DatabaseModule],
  providers: [FriendsSearchResolver, FriendsSearchService, ...handlers],
})
export class FriendsSearchModule {}
