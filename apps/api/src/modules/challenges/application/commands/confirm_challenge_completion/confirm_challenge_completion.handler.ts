import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfirmChallengeCompletionCommand } from './confirm_challenge_completion.command';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus } from '@prisma/client';

@CommandHandler(ConfirmChallengeCompletionCommand)
export class ConfirmChallengeCompletionCommandHandler
  implements ICommandHandler<ConfirmChallengeCompletionCommand>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(command: ConfirmChallengeCompletionCommand) {
    const challenge = await this.challengeRepository.findById(
      command.challengeId,
    );
    if (!challenge) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Nie znaleziono wyzwania' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (challenge.challengerId !== command.oauthId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Tylko rzucający może potwierdzić ukończenie',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (challenge.status !== ChallengeStatus.AWAITING_CONFIRMATION) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Wyzwanie nie oczekuje na potwierdzenie',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.challengeRepository.markCompleted(
      command.challengeId,
      new Date(),
    );
  }
}
