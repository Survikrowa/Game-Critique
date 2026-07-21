import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GameStatusChangedEvent } from '../events/game_status_changed.event';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../domain/ports/push-token.repository.port';
import {
  NOTIFICATIONS_SERVICE,
  NotificationsServicePort,
} from '../../domain/ports/notifications.service.port';
import { PrismaService } from '../../../database/prisma.service';

@EventsHandler(GameStatusChangedEvent)
export class GameStatusChangedHandler
  implements IEventHandler<GameStatusChangedEvent>
{
  constructor(
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: NotificationsServicePort,
    private readonly prisma: PrismaService,
  ) {}

  async handle(event: GameStatusChangedEvent): Promise<void> {
    const senderName = await this.getSenderName(event.oauthId);
    const body = this.buildNotificationBody(event, senderName);
    if (!body) return;

    const friendIds = await this.resolveRecipients(event);
    if (friendIds.length === 0) return;

    const enabledIds = await this.filterByPreference(
      friendIds,
      'friendActivity',
    );
    if (enabledIds.length === 0) return;

    const tokens = await this.prisma.pushToken.findMany({
      where: { oauthId: { in: enabledIds } },
    });
    if (tokens.length === 0) return;

    await this.notificationsService.sendBulkPush(
      tokens.map((t) => t.token),
      'Aktywność znajomych',
      body,
      {
        type: 'game',
        hltbId: event.hltbId,
        oauthId: event.oauthId,
        gamesStatusId: event.gamesStatusId,
      },
    );
  }

  private async getSenderName(oauthId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({
      where: { oauthId },
    });
    return profile?.name || 'Ktoś';
  }

  private buildNotificationBody(
    event: GameStatusChangedEvent,
    senderName: string,
  ): string | null {
    if (event.status === 'COMPLETED') {
      return event.score
        ? `${senderName} ukończył ${event.gameTitle} i dał ${event.score}/10`
        : `${senderName} ukończył ${event.gameTitle}`;
    }
    if (event.status === 'IN_PROGRESS') {
      return `${senderName} zaczął grać w ${event.gameTitle}`;
    }
    if (event.score) {
      return `${senderName} ocenił ${event.gameTitle} — ${event.score}/10`;
    }
    if (event.review) {
      return `${senderName} napisał recenzję ${event.gameTitle}`;
    }
    return null;
  }

  private async resolveRecipients(
    event: GameStatusChangedEvent,
  ): Promise<string[]> {
    return event.friendOauthIds;
  }

  private async filterByPreference(
    oauthIds: string[],
    preference:
      | 'friendActivity'
      | 'friendInvites'
      | 'weeklySummary'
      | 'releaseReminders',
  ): Promise<string[]> {
    const prefs = await this.prisma.notificationPreferences.findMany({
      where: { oauthId: { in: oauthIds } },
    });
    const prefMap = new Map(prefs.map((p) => [p.oauthId, p]));
    return oauthIds.filter((id) => {
      const p = prefMap.get(id);
      if (preference === 'friendActivity') return p?.friendActivity ?? true;
      return true;
    });
  }
}
