import { Module } from '@nestjs/common';
import { CommandHandlerType, CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { RolesResolver } from './roles.resolver';
import { GetRolesHandler } from './queries/get_roles/get_roles.handler';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';
import { UpdateUserRoleHandler } from './commands/update_user_role/update_user_role.handler';

const CommandHandlers: QueryHandlerType[] = [GetRolesHandler];
const EventHandlers: CommandHandlerType[] = [UpdateUserRoleHandler];

@Module({
  imports: [CqrsModule, DatabaseModule, AuthModule],
  providers: [
    RolesResolver,
    RolesService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class RolesModule {}
