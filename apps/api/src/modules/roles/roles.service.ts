import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleDTO } from './roles.dto';
import { GetRolesQuery } from './queries/get_roles/get_roles.query';
import { UpdateUserRoleCommand } from './commands/update_user_role/update_user_role.command';

@Injectable()
export class RolesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getRoles(): Promise<RoleDTO[]> {
    return this.queryBus.execute<GetRolesQuery, RoleDTO[]>(new GetRolesQuery());
  }

  async updateUserRole({
    roleId,
    userOauthId,
  }: UpdateUserRoleArgs): Promise<void> {
    return this.commandBus.execute<UpdateUserRoleCommand>(
      new UpdateUserRoleCommand(roleId, userOauthId),
    );
  }
}

type UpdateUserRoleArgs = {
  roleId: number;
  userOauthId: string;
};
