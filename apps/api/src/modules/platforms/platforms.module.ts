import { Module } from '@nestjs/common';
import { CommandHandlerType, CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { PlatformsService } from './platforms.service';
import { DatabaseModule } from '../database/database.module';
import { GetAllPlatformsQueryHandler } from './queries/get_all_platforms/get_all_platforms.handler';
import { PlatformsResolver } from './platforms.resolver';
import { AuthModule } from '../auth/auth.module';
import { UpdatePlatformCommandHandler } from './commands/update_platform/update_platform.handler';

const QueryHandlers: QueryHandlerType[] = [GetAllPlatformsQueryHandler];
const CommandHandlers: CommandHandlerType[] = [UpdatePlatformCommandHandler];

@Module({
  imports: [CqrsModule, DatabaseModule, AuthModule],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    PlatformsService,
    PlatformsResolver,
  ],
  exports: [],
})
export class PlatformsModule {}
