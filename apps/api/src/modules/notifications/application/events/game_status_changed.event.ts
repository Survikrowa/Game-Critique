import { IEvent } from '@nestjs/cqrs';

export class GameStatusChangedEvent implements IEvent {
  constructor(
    public readonly oauthId: string,
    public readonly hltbId: number,
    public readonly gameTitle: string,
    public readonly status: string,
    public readonly score: string | null,
    public readonly review: string | null,
    public readonly friendOauthIds: string[],
  ) {}
}
