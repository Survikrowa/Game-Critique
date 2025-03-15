import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../database/database.module';
import { UsersActivityModule } from './users_activity/users_activity.module';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';
import { GetUsersHandler } from './queries/get_users/get_users.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/get_user/get_user.handler';

export const CommandHandlers = [GetUsersHandler, GetUserHandler];
export const EventHandlers = [];

@Module({
  imports: [CqrsModule, DatabaseModule, UsersActivityModule, AuthModule],
  providers: [
    UsersService,
    UsersRepository,
    UsersResolver,
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [UsersService, UsersActivityModule],
})
export class UsersModule {}
