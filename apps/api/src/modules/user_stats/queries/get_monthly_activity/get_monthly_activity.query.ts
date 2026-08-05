export class GetMonthlyActivityQuery {
  constructor(
    public readonly year: number | null,
    public readonly oauthId: string,
  ) {}
}
