import { Module } from '@nestjs/common';
import { UsersActivityResolver } from './users_activity.resolver';
import { DatabaseModule } from '../../database/database.module';
import { UsersActivityService } from './users_activity.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersActivityResolver, UsersActivityService],
  exports: [UsersActivityService],
})
export class UsersActivityModule {}
