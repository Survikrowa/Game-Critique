import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';

export type GameReminderProps = {
  oauthId: string;
  igdbId: number;
  gameName: string;
  gameUrl: string;
  releaseDate: Date;
  coverUrl?: string | null;
  notifiedOneWeek: boolean;
  notifiedReleaseDay: boolean;
  createdAt: Date;
};

export class GameReminder extends AggregateRoot<GameReminderProps> {
  get oauthId(): string {
    return this.props.oauthId;
  }
  get igdbId(): number {
    return this.props.igdbId;
  }
  get gameName(): string {
    return this.props.gameName;
  }
  get gameUrl(): string {
    return this.props.gameUrl;
  }
  get releaseDate(): Date {
    return this.props.releaseDate;
  }
  get coverUrl(): string | null | undefined {
    return this.props.coverUrl;
  }
  get notifiedOneWeek(): boolean {
    return this.props.notifiedOneWeek;
  }
  get notifiedReleaseDay(): boolean {
    return this.props.notifiedReleaseDay;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: GameReminderProps, id?: number): GameReminder {
    return new GameReminder(props, id);
  }
}
