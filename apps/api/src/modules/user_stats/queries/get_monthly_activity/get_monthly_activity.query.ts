export class GetMonthlyActivityQuery {
  constructor(
    public readonly year: number,
    public readonly oauthId: string,
  ) {}
}
