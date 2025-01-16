import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FriendsListRepository } from './friends_list.repository';
import { FriendsListService } from './friends_list.service';
import { FriendsListResolver } from './friends_list.resolver';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [forwardRef(() => DatabaseModule), AuthModule],
  providers: [FriendsListRepository, FriendsListService, FriendsListResolver],
  exports: [FriendsListService],
})
export class FriendsListModule {}
