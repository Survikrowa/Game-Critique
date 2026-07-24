export class RemoveReminderCommand {
  constructor(
    public readonly oauthId: string,
    public readonly igdbId: number,
  ) {}
}
