import { ICommand } from '@nestjs/cqrs';

export class CompleteChallengeCommand implements ICommand {
  constructor(
    public readonly challengeId: number,
    public readonly oauthId: string,
  ) {}
}
