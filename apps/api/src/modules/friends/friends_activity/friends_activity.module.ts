import { forwardRef, Module } from '@nestjs/common';
import { FriendsActivityResolver } from './friends_activity.resolver';
import { DatabaseModule } from '../../database/database.module';
import { FriendsActivityService } from './friends_activity.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [FriendsActivityResolver, FriendsActivityService],
})
export class FriendsActivityModule {}
