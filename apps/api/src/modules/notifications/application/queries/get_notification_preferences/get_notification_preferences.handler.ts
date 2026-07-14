import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../database/prisma.service';
import { GetNotificationPreferencesQuery } from './get_notification_preferences.query';

export interface NotificationPreferencesDTO {
  friendActivity: boolean;
  friendInvites: boolean;
  weeklySummary: boolean;
  releaseReminders: boolean;
}

@QueryHandler(GetNotificationPreferencesQuery)
export class GetNotificationPreferencesHandler
  implements IQueryHandler<GetNotificationPreferencesQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: GetNotificationPreferencesQuery,
  ): Promise<NotificationPreferencesDTO | null> {
    const prefs = await this.prisma.notificationPreferences.findUnique({
      where: { oauthId: query.oauthId },
    });
    if (!prefs) return null;
    return {
      friendActivity: prefs.friendActivity,
      friendInvites: prefs.friendInvites,
      weeklySummary: prefs.weeklySummary,
      releaseReminders: prefs.releaseReminders,
    };
  }
}
