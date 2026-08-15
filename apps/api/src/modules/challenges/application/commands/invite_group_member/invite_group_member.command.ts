import { ICommand } from '@nestjs/cqrs';

export class InviteGroupMemberCommand implements ICommand {
  constructor(
    public readonly groupId: number,
    public readonly inviterOauthId: string,
    public readonly invitedOauthId: string,
  ) {}
}
