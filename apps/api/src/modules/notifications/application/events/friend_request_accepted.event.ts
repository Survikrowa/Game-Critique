import { IEvent } from '@nestjs/cqrs';

export class FriendRequestAcceptedEvent implements IEvent {
  constructor(
    public readonly requesterOauthId: string,
    public readonly requesterName: string,
    public readonly accepterOauthId: string,
    public readonly accepterName: string,
  ) {}
}
