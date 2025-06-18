import { Command } from '@nestjs/cqrs';

export class UpdateGameDataCommand extends Command<UpdateGameDataCommandResponse | null> {
  constructor(public readonly hltbId: number) {
    super();
  }
}

export type UpdateGameDataCommandResponse = {
  hltbId: number;
};
