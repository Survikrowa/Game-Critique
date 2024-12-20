import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleDTO } from './roles.dto';
import { GetRolesQuery } from './queries/get_roles/get_roles.query';

@Injectable()
export class RolesService {
  constructor(private readonly queryBus: QueryBus) {}

  async getRoles(): Promise<RoleDTO[]> {
    return this.queryBus.execute<GetRolesQuery, RoleDTO[]>(new GetRolesQuery());
  }
}
