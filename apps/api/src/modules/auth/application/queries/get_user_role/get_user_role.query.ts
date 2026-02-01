import { Query } from '@nestjs/cqrs';
import { RoleEnum } from '@prisma/client';

export class GetUserRoleQuery extends Query<GetUserRoleQueryResponse> {
  constructor(public readonly oauthId: string) {
    super();
  }
}

type GetUserRoleQueryResponse = {
  role: RoleEnum | undefined;
};
