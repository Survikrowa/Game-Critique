export class UpdateUserRoleCommand {
  constructor(
    public readonly roleId: number,
    public readonly userOauthId: string,
  ) {}
}
