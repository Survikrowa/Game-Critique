import { IQuery } from '@nestjs/cqrs';

export class GetChallengeGroupsQuery implements IQuery {
  constructor(public readonly oauthId: string) {}
}
