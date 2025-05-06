import { Module } from '@nestjs/common';
import { CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { PlatformsService } from './platforms.service';
import { DatabaseModule } from '../database/database.module';
import { GetAllPlatformsQueryHandler } from './queries/get_all_platforms/get_all_platforms.handler';
import { PlatformsResolver } from './platforms.resolver';
import { AuthModule } from '../auth/auth.module';

const QueryHandlers: QueryHandlerType[] = [GetAllPlatformsQueryHandler];

@Module({
  imports: [CqrsModule, DatabaseModule, AuthModule],
  providers: [...QueryHandlers, PlatformsService, PlatformsResolver],
  exports: [],
})
export class PlatformsModule {}
