import { Module } from '@nestjs/common';
import { CommandHandlerType, CqrsModule, EventHandlerType } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { RolesResolver } from './roles.resolver';
import { GetRolesHandler } from './queries/get_roles/get_roles.handler';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';

const CommandHandlers: CommandHandlerType[] = [GetRolesHandler];
const EventHandlers: EventHandlerType[] = [];

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
