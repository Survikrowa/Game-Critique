import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnregisterPushTokenCommand } from './unregister_push_token.command';
import {
  PUSH_TOKEN_REPOSITORY,
  PushTokenRepositoryPort,
} from '../../../domain/ports/push-token.repository.port';

@CommandHandler(UnregisterPushTokenCommand)
export class UnregisterPushTokenHandler
  implements ICommandHandler<UnregisterPushTokenCommand>
{
  constructor(
    @Inject(PUSH_TOKEN_REPOSITORY)
    private readonly pushTokenRepository: PushTokenRepositoryPort,
  ) {}

  async execute(command: UnregisterPushTokenCommand): Promise<boolean> {
    await this.pushTokenRepository.deleteByToken(command.token);
    return true;
  }
}
