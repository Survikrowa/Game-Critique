import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { NotificationsResolver } from './infrastructure/graphql/notifications.resolver';
import { PUSH_TOKEN_REPOSITORY } from './domain/ports/push-token.repository.port';
import { NOTIFICATIONS_SERVICE } from './domain/ports/notifications.service.port';
import { PrismaPushTokenRepository } from './infrastructure/adapters/prisma-push-token.repository';
import { ExpoNotificationsService } from './infrastructure/adapters/expo-notifications.service';
import { RegisterPushTokenHandler } from './application/commands/register_push_token/register_push_token.handler';
import { UnregisterPushTokenHandler } from './application/commands/unregister_push_token/unregister_push_token.handler';
import { GetNotificationPreferencesHandler } from './application/queries/get_notification_preferences/get_notification_preferences.handler';
import { GameStatusChangedHandler } from './application/handlers/game_status_changed.handler';
import { FriendRequestAcceptedHandler } from './application/handlers/friend_request_accepted.handler';
import { FriendRequestReceivedHandler } from './application/handlers/friend_request_received.handler';
import { WeeklySummaryHandler } from './application/handlers/weekly_summary.handler';

const CommandHandlers = [RegisterPushTokenHandler, UnregisterPushTokenHandler];
const QueryHandlers = [GetNotificationPreferencesHandler];
const EventHandlers = [
  GameStatusChangedHandler,
  FriendRequestAcceptedHandler,
  FriendRequestReceivedHandler,
  WeeklySummaryHandler,
];

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [
    NotificationsResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    {
      provide: PUSH_TOKEN_REPOSITORY,
      useClass: PrismaPushTokenRepository,
    },
    {
      provide: NOTIFICATIONS_SERVICE,
      useClass: ExpoNotificationsService,
    },
  ],
  exports: [CqrsModule],
})
export class NotificationsModule {}
