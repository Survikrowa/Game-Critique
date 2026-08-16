import { ICommand } from '@nestjs/cqrs';

export class ConfirmChallengeCompletionCommand implements ICommand {
  constructor(
    public readonly challengeId: number,
    public readonly oauthId: string,
  ) {}
}
