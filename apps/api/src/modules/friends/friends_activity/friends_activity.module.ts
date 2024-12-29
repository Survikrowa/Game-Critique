import { forwardRef, Module } from '@nestjs/common';
import { FriendsActivityResolver } from './friends_activity.resolver';
import { DatabaseModule } from '../../database/database.module';
import { FriendsActivityService } from './friends_activity.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [forwardRef(() => DatabaseModule), AuthModule],
  providers: [FriendsActivityResolver, FriendsActivityService],
})
export class FriendsActivityModule {}
