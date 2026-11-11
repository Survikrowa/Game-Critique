import { ICommand } from '@nestjs/cqrs';

export class DeclineGroupInviteCommand implements ICommand {
  constructor(
    public readonly groupId: number,
    public readonly oauthId: string,
  ) {}
}
