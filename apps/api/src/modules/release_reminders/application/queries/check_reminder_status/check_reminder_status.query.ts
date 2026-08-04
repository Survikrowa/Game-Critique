export class CheckReminderStatusQuery {
  constructor(
    public readonly oauthId: string,
    public readonly igdbId: number,
  ) {}
}
