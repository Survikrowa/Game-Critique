import { forwardRef, Module } from '@nestjs/common';
import { GamesStatusResolver } from './games_status.resolver';
import { DatabaseModule } from '../database/database.module';
import { GamesStatusRepository } from './games_status.repository';
import { GamesStatusService } from './games_status.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { CommandHandlerType, CqrsModule, QueryHandlerType } from '@nestjs/cqrs';
import { GetAllUserGamesStatusByOauthIdHandler } from './queries/get_all_user_games_status_by_oauthid/get_all_user_games_status_by_oauthid.handler';
import { RemoveUserGameStatusByUserOauthIdHandler } from './commands/remove_user_game_status_by_user_oauth_id/remove_user_game_status_by_user_oauth_id.handler';
import { GetLastEditedGamesHandler } from './queries/get_last_edited_games/get_last_edited_games.handler';

const QueryHandlers: QueryHandlerType[] = [
  GetAllUserGamesStatusByOauthIdHandler,
  GetLastEditedGamesHandler,
];

const CommandHandlers: CommandHandlerType[] = [
  RemoveUserGameStatusByUserOauthIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => DatabaseModule),
    UsersModule,
    AuthModule,
  ],
  providers: [
    GamesStatusResolver,
    GamesStatusRepository,
    GamesStatusService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  exports: [GamesStatusService, GamesStatusRepository],
})
export class GamesStatusModule {}
