import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ReleaseRemindersResolver } from './infrastructure/graphql/release_reminders.resolver';
import { GAME_REMINDER_REPOSITORY } from './domain/ports/game_reminder.repository.port';
import { PrismaGameReminderRepository } from './infrastructure/adapters/prisma-game-reminder.repository';
import { AddReminderHandler } from './application/commands/add_reminder/add_reminder.handler';
import { RemoveReminderHandler } from './application/commands/remove_reminder/remove_reminder.handler';
import { SendReminderNotificationsHandler } from './application/commands/send_reminder_notifications/send_reminder_notifications.handler';
import { GetUserRemindersHandler } from './application/queries/get_user_reminders/get_user_reminders.handler';
import { CheckReminderStatusHandler } from './application/queries/check_reminder_status/check_reminder_status.handler';

const CommandHandlers = [
  AddReminderHandler,
  RemoveReminderHandler,
  SendReminderNotificationsHandler,
];
const QueryHandlers = [GetUserRemindersHandler, CheckReminderStatusHandler];

@Module({
  imports: [CqrsModule, DatabaseModule, AuthModule, NotificationsModule],
  providers: [
    ReleaseRemindersResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: GAME_REMINDER_REPOSITORY,
      useClass: PrismaGameReminderRepository,
    },
  ],
})
export class ReleaseRemindersModule {}
