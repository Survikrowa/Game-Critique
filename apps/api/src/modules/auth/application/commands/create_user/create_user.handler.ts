import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create_user.command';
import { Inject } from '@nestjs/common';
import {
  AUTH_REPOSITORY,
  AuthRepositoryPort,
} from '../../../domain/ports/auth.repository.port';
import { AuthUser, UserRole } from '../../../domain/models/auth-user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryPort,
  ) {}

  async execute(command: CreateUserCommand) {
    const newUser = AuthUser.create({
      oauthId: command.oauthId,
      role: UserRole.USER,
    });

    const savedUser = await this.authRepository.save(newUser);

    return {
      id: savedUser.id,
      role: savedUser.role,
    };
  }
}
