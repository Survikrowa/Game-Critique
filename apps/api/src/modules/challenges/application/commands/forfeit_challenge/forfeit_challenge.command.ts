import { ICommand } from '@nestjs/cqrs';

export class ForfeitChallengeCommand implements ICommand {
  constructor(
    public readonly challengeId: number,
    public readonly oauthId: string,
  ) {}
}
