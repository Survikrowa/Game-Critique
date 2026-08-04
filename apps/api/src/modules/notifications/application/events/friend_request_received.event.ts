import { IEvent } from '@nestjs/cqrs';

export class FriendRequestReceivedEvent implements IEvent {
  constructor(
    public readonly senderOauthId: string,
    public readonly senderName: string,
    public readonly receiverOauthId: string,
  ) {}
}
