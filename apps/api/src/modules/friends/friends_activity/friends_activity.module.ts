import { forwardRef, Module } from '@nestjs/common';
import { FriendsActivityResolver } from './friends_activity.resolver';
import { DatabaseModule } from '../../database/database.module';
import { FriendsActivityService } from './friends_activity.service';
import { AuthModule } from '../../auth/auth.module';
import { GetFriendsActivityHandler } from './queries/get_friends_activity/get_friends_activity.handler';
import { CqrsModule } from '@nestjs/cqrs';

const handlers = [GetFriendsActivityHandler];

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule), AuthModule],
  providers: [FriendsActivityResolver, FriendsActivityService, ...handlers],
})
export class FriendsActivityModule {}
