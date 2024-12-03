import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../database/database.module';
import { UsersActivityModule } from './users_activity/users_activity.module';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersActivityModule, AuthModule],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService, UsersActivityModule],
})
export class UsersModule {}
