import { ICommand } from '@nestjs/cqrs';

export class FetchDoesItPlayDataCommand implements ICommand {
  constructor(public readonly hltbId: number) {}
}
