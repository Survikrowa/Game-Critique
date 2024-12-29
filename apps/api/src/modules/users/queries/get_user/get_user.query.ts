type UserQueryOptions = {
  activityLimit?: number;
};

export class GetUserQuery {
  constructor(
    public readonly oauthId: string,
    public readonly options?: UserQueryOptions,
  ) {}
}
