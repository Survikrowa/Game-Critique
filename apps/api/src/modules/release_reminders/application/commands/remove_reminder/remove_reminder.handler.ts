import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveReminderCommand } from './remove_reminder.command';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';

@CommandHandler(RemoveReminderCommand)
export class RemoveReminderHandler
  implements ICommandHandler<RemoveReminderCommand>
{
  constructor(
    @Inject(GAME_REMINDER_REPOSITORY)
    private readonly repository: GameReminderRepositoryPort,
  ) {}

  async execute(command: RemoveReminderCommand): Promise<boolean> {
    await this.repository.deleteByOauthIdAndIgdbId(
      command.oauthId,
      command.igdbId,
    );
    return true;
  }
}
