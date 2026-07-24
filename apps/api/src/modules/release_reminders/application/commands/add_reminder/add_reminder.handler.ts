import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddReminderCommand } from './add_reminder.command';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';
import { GameReminder } from '../../../domain/models/game_reminder.model';

@CommandHandler(AddReminderCommand)
export class AddReminderHandler implements ICommandHandler<AddReminderCommand> {
  constructor(
    @Inject(GAME_REMINDER_REPOSITORY)
    private readonly repository: GameReminderRepositoryPort,
  ) {}

  async execute(command: AddReminderCommand): Promise<GameReminder> {
    const { oauthId, input } = command;

    const existing = await this.repository.findByOauthIdAndIgdbId(
      oauthId,
      input.igdbId,
    );
    if (existing) {
      return existing;
    }

    if (new Date(input.releaseDate) < new Date()) {
      throw new Error(
        'Cannot set reminder for a game that has already been released',
      );
    }

    const reminder = GameReminder.create({
      oauthId,
      igdbId: input.igdbId,
      gameName: input.gameName,
      gameUrl: input.gameUrl,
      releaseDate: new Date(input.releaseDate),
      coverUrl: input.coverUrl || null,
      notifiedOneWeek: false,
      notifiedReleaseDay: false,
      createdAt: new Date(),
    });

    return this.repository.save(reminder);
  }
}
