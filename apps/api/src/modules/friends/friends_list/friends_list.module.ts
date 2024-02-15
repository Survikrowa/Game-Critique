import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FriendsListRepository } from './friends_list.repository';
import { FriendsListService } from './friends_list.service';
import { FriendsListResolver } from './friends_list.resolver';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [FriendsListRepository, FriendsListService, FriendsListResolver],
  exports: [FriendsListService],
})
export class FriendsListModule {}
