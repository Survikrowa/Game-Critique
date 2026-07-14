import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FriendRequestReceivedEvent } from '../events/friend_request_received.event';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../domain/ports/push-token.repository.port';
import {
  NOTIFICATIONS_SERVICE,
  NotificationsServicePort,
} from '../../domain/ports/notifications.service.port';

@EventsHandler(FriendRequestReceivedEvent)
export class FriendRequestReceivedHandler
  implements IEventHandler<FriendRequestReceivedEvent>
{
  constructor(
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: NotificationsServicePort,
  ) {}

  async handle(event: FriendRequestReceivedEvent): Promise<void> {
    const tokens = await this.pushTokenRepository.findByOauthId(
      event.receiverOauthId,
    );
    if (tokens.length === 0) return;

    await this.notificationsService.sendBulkPush(
      tokens.map((t) => t.token),
      'Nowe zaproszenie',
      `${event.senderName} chce Cię dodać do znajomych`,
      { type: 'friend', oauthId: event.senderOauthId },
    );
  }
}
