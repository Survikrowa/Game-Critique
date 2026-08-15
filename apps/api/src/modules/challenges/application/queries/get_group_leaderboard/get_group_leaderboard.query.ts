import { IQuery } from '@nestjs/cqrs';

export class GetGroupLeaderboardQuery implements IQuery {
  constructor(
    public readonly groupId: number,
    public readonly oauthId: string,
  ) {}
}
