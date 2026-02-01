import { Command } from '@nestjs/cqrs';
import { RoleEnum } from '@prisma/client';

export class CreateUserCommand extends Command<CreateUserCommandResponse> {
  constructor(public readonly oauthId: string) {
    super();
  }
}

type CreateUserCommandResponse = {
  id: number;
  role: RoleEnum;
};
