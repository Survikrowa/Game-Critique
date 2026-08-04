import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CheckReminderStatusQuery } from './check_reminder_status.query';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';

@QueryHandler(CheckReminderStatusQuery)
export class CheckReminderStatusHandler
  implements IQueryHandler<CheckReminderStatusQuery>
{
  constructor(
    @Inject(GAME_REMINDER_REPOSITORY)
    private readonly repository: GameReminderRepositoryPort,
  ) {}

  async execute(query: CheckReminderStatusQuery): Promise<boolean> {
    const reminder = await this.repository.findByOauthIdAndIgdbId(
      query.oauthId,
      query.igdbId,
    );
    return reminder !== null;
  }
}
