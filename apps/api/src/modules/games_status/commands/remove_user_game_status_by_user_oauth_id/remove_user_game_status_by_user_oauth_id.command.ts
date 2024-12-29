export class RemoveUserGameStatusByUserOauthIdCommand {
  constructor(
    public readonly userOauthId: string,
    public readonly gameStatusId: number,
  ) {}
}
