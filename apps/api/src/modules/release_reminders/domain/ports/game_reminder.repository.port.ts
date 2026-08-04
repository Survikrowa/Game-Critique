import { RepositoryPort } from '../../../../libs/ddd/repository.port';
import { GameReminder } from '../models/game_reminder.model';

export const GAME_REMINDER_REPOSITORY = Symbol('GAME_REMINDER_REPOSITORY');

export interface GameReminderRepositoryPort
  extends RepositoryPort<GameReminder> {
  findByOauthId(oauthId: string): Promise<GameReminder[]>;
  findByOauthIdAndIgdbId(
    oauthId: string,
    igdbId: number,
  ): Promise<GameReminder | null>;
  findByDateRange(start: Date, end: Date): Promise<GameReminder[]>;
  update(
    id: number,
    data: Partial<{
      notifiedOneWeek: boolean;
      notifiedReleaseDay: boolean;
    }>,
  ): Promise<void>;
  deleteByOauthIdAndIgdbId(oauthId: string, igdbId: number): Promise<void>;
}
