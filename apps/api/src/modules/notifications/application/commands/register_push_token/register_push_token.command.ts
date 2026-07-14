import { ICommand } from '@nestjs/cqrs';

export class RegisterPushTokenCommand implements ICommand {
  constructor(
    public readonly oauthId: string,
    public readonly token: string,
    public readonly platform: string,
  ) {}
}
