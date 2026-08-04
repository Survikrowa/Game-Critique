import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterPushTokenCommand } from './register_push_token.command';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../../domain/ports/push-token.repository.port';
import { PushToken } from '../../../domain/models/push-token.model';

@CommandHandler(RegisterPushTokenCommand)
export class RegisterPushTokenHandler
  implements ICommandHandler<RegisterPushTokenCommand>
{
  constructor(
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
  ) {}

  async execute(command: RegisterPushTokenCommand): Promise<boolean> {
    const existing = await this.pushTokenRepository.findByToken(command.token);
    if (existing) return true;

    const pushToken = PushToken.create({
      oauthId: command.oauthId,
      token: command.token,
      platform: command.platform,
    });

    await this.pushTokenRepository.save(pushToken);
    return true;
  }
}
