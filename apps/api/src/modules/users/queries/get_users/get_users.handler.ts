import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get_users.query';
import { UsersRepository } from '../../users.repository';

import { GetAllUsersWithProfileReturn } from '../../users.types';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(): Promise<GetAllUsersWithProfileReturn[]> {
    return this.usersRepository.getAllUsers();
  }
}
