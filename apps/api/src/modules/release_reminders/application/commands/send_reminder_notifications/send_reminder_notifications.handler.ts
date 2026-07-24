import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendReminderNotificationsCommand } from './send_reminder_notifications.command';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../../../notifications/domain/ports/push-token.repository.port';
import {
  NOTIFICATIONS_SERVICE,
  NotificationsServicePort,
} from '../../../../notifications/domain/ports/notifications.service.port';
import { PrismaService } from '../../../../database/prisma.service';
import { GameReminder } from '../../../domain/models/game_reminder.model';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;
const NOTIFICATION_WINDOW = 24 * 60 * 60 * 1000;

@Injectable()
@CommandHandler(SendReminderNotificationsCommand)
export class SendReminderNotificationsHandler
  implements ICommandHandler<SendReminderNotificationsCommand>
{
  private readonly logger = new Logger(SendReminderNotificationsHandler.name);

  constructor(
    @Inject(GAME_REMINDER_REPOSITORY)
    private readonly reminderRepository: GameReminderRepositoryPort,
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: NotificationsServicePort,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleCron(): Promise<void> {
    await this.execute();
  }

  async execute(): Promise<void> {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + ONE_WEEK);
    const todayEnd = new Date(now.getTime() + ONE_DAY);

    const oneWeekReminders = await this.reminderRepository.findByDateRange(
      new Date(oneWeekFromNow.getTime() - NOTIFICATION_WINDOW),
      new Date(oneWeekFromNow.getTime() + NOTIFICATION_WINDOW),
    );

    const releaseDayReminders = await this.reminderRepository.findByDateRange(
      now,
      todayEnd,
    );

    await this.sendNotifications(oneWeekReminders, 'oneWeek');
    await this.sendNotifications(releaseDayReminders, 'releaseDay');
  }

  private async sendNotifications(
    reminders: GameReminder[],
    type: 'oneWeek' | 'releaseDay',
  ): Promise<void> {
    const remindersByUser = this.groupByOauthId(reminders);

    for (const [oauthId, userReminders] of Object.entries(remindersByUser)) {
      const prefs = await this.prisma.notificationPreferences.findUnique({
        where: { oauthId },
      });
      if (!prefs?.releaseReminders) continue;

      const tokens = await this.pushTokenRepository.findByOauthId(oauthId);
      if (tokens.length === 0) continue;

      const tokenStrings = tokens.map((t) => t.token);

      for (const reminder of userReminders) {
        const shouldNotify =
          type === 'oneWeek'
            ? !reminder.notifiedOneWeek
            : !reminder.notifiedReleaseDay;

        if (!shouldNotify) continue;

        const title =
          type === 'oneWeek' ? 'Za tydzień premiera!' : 'Premiera już dziś!';

        const body =
          type === 'oneWeek'
            ? `${reminder.gameName} wychodzi za tydzień!`
            : `${reminder.gameName} właśnie wyszło!`;

        const sent = await this.notificationsService.sendBulkPush(
          tokenStrings,
          title,
          body,
          {
            type: 'release_reminder',
            igdbId: reminder.igdbId,
            gameUrl: reminder.gameUrl,
            gameName: reminder.gameName,
          },
        );

        if (sent > 0) {
          if (type === 'oneWeek') {
            await this.reminderRepository.update(reminder.id, {
              notifiedOneWeek: true,
            });
          } else {
            await this.reminderRepository.update(reminder.id, {
              notifiedReleaseDay: true,
            });
          }

          this.logger.log(
            `Sent ${type} reminder for "${reminder.gameName}" to user ${oauthId} (${sent} pushes)`,
          );
        }
      }
    }
  }

  private groupByOauthId(
    reminders: GameReminder[],
  ): Record<string, GameReminder[]> {
    const grouped: Record<string, GameReminder[]> = {};
    for (const r of reminders) {
      const key = r.oauthId;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    }
    return grouped;
  }
}
