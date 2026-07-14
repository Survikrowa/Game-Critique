import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FriendRequestAcceptedEvent } from '../events/friend_request_accepted.event';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../domain/ports/push-token.repository.port';
import {
  NOTIFICATIONS_SERVICE,
  NotificationsServicePort,
} from '../../domain/ports/notifications.service.port';

@EventsHandler(FriendRequestAcceptedEvent)
export class FriendRequestAcceptedHandler
  implements IEventHandler<FriendRequestAcceptedEvent>
{
  constructor(
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: NotificationsServicePort,
  ) {}

  async handle(event: FriendRequestAcceptedEvent): Promise<void> {
    const requesterTokens = await this.pushTokenRepository.findByOauthId(
      event.requesterOauthId,
    );
    if (requesterTokens.length > 0) {
      await this.notificationsService.sendBulkPush(
        requesterTokens.map((t) => t.token),
        'Zaproszenie przyjęte',
        `${event.accepterName} zaakceptował Twoje zaproszenie!`,
        { type: 'friend', oauthId: event.accepterOauthId },
      );
    }

    const accepterTokens = await this.pushTokenRepository.findByOauthId(
      event.accepterOauthId,
    );
    if (accepterTokens.length > 0) {
      await this.notificationsService.sendBulkPush(
        accepterTokens.map((t) => t.token),
        'Nowy znajomy',
        `${event.requesterName} jest teraz Twoim znajomym!`,
        { type: 'friend', oauthId: event.requesterOauthId },
      );
    }
  }
}
