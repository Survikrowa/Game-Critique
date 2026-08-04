import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create_user.command';
import { Inject } from '@nestjs/common';
import {
  AUTH_REPOSITORY,
  AuthRepositoryPort,
} from '../../../domain/ports/auth.repository.port';
import {
  PROFILE_REPOSITORY,
  ProfileRepositoryPort,
} from '../../../domain/ports/profile.repository.port';
import { AuthUser, UserRole } from '../../../domain/models/auth-user.model';

const DEFAULT_AVATAR_URL =
  'https://res.cloudinary.com/survikrowa/image/upload/v1705345880/y5oklavnu42orgau8cyc.png';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryPort,
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute(command: CreateUserCommand) {
    const newUser = AuthUser.create({
      oauthId: command.oauthId,
      role: UserRole.USER,
    });

    const savedUser = await this.authRepository.save(newUser);

    await this.profileRepository.createProfile({
      userId: savedUser.id,
      name: command.username,
      avatarUrl: DEFAULT_AVATAR_URL,
    });

    return {
      id: savedUser.id,
      role: savedUser.role,
    };
  }
}
