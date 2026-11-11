import { IQuery } from '@nestjs/cqrs';
import { ChallengeStatus } from '@prisma/client';

export class GetChallengesQuery implements IQuery {
  constructor(
    public readonly groupId: number,
    public readonly oauthId: string,
    public readonly status?: ChallengeStatus,
  ) {}
}
