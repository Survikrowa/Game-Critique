import { Command } from '@nestjs/cqrs';

export class UpdateGameDataCommand extends Command<UpdateGameDataCommandResponse | null> {
  constructor(public readonly gameId: number) {
    super();
  }
}

export type UpdateGameDataCommandResponse = {
  gameId: number;
};
