import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get_user.query';
import { UsersRepository } from '../../users.repository';

import { GetUserReturn } from '../../users.types';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserQuery): Promise<GetUserReturn | null> {
    return this.usersRepository.getUserByOauthId({
      oauthId: query.oauthId,
      options: query.options,
    });
  }
}
