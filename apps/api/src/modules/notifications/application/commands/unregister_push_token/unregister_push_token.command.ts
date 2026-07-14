import { ICommand } from '@nestjs/cqrs';

export class UnregisterPushTokenCommand implements ICommand {
  constructor(public readonly token: string) {}
}
