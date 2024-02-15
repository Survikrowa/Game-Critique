import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../database/database.module';
import { UsersActivityModule } from './users_activity/users_activity.module';

@Module({
  imports: [DatabaseModule, UsersActivityModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersActivityModule],
})
export class UsersModule {}
