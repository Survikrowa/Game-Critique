import { ICommand } from '@nestjs/cqrs';

export class DeclineChallengeCommand implements ICommand {
  constructor(
    public readonly challengeId: number,
    public readonly oauthId: string,
  ) {}
}
