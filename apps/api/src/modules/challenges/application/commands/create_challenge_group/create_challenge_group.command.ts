import { ICommand } from '@nestjs/cqrs';

export class CreateChallengeGroupCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly ownerId: string,
  ) {}
}
