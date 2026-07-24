import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserRemindersQuery } from './get_user_reminders.query';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';
import { GameReminder } from '../../../domain/models/game_reminder.model';

@QueryHandler(GetUserRemindersQuery)
export class GetUserRemindersHandler
  implements IQueryHandler<GetUserRemindersQuery>
{
  constructor(
    @Inject(GAME_REMINDER_REPOSITORY)
    private readonly repository: GameReminderRepositoryPort,
  ) {}

  async execute(query: GetUserRemindersQuery): Promise<GameReminder[]> {
    return this.repository.findByOauthId(query.oauthId);
  }
}
