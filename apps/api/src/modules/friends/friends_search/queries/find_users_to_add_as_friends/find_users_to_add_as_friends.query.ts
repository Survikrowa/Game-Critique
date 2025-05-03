export class FindUsersToAddAsFriendsQuery {
  constructor(
    public readonly oauthId: string,
    public readonly username: string,
  ) {}
}
