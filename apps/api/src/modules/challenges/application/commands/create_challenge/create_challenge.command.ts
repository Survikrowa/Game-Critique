import { ICommand } from '@nestjs/cqrs';
import { ChallengeType } from '@prisma/client';

export class CreateChallengeCommand implements ICommand {
  constructor(
    public readonly groupId: number,
    public readonly challengerOauthId: string,
    public readonly recipientOauthId: string,
    public readonly type: ChallengeType,
    public readonly gameId: number,
    public readonly description: string | null,
  ) {}
}
