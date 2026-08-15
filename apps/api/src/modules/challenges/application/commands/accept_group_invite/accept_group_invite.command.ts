import { ICommand } from '@nestjs/cqrs';

export class AcceptGroupInviteCommand implements ICommand {
  constructor(
    public readonly groupId: number,
    public readonly oauthId: string,
  ) {}
}
