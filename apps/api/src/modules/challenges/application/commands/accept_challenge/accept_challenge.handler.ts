import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AcceptChallengeCommand } from './accept_challenge.command';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus } from '@prisma/client';

@CommandHandler(AcceptChallengeCommand)
export class AcceptChallengeCommandHandler
  implements ICommandHandler<AcceptChallengeCommand>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(command: AcceptChallengeCommand) {
    const challenge = await this.challengeRepository.findById(
      command.challengeId,
    );
    if (!challenge) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Nie znaleziono wyzwania' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (challenge.recipientId !== command.oauthId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Tylko odbiorca może akceptować wyzwanie',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (challenge.status !== ChallengeStatus.PENDING) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Wyzwanie nie jest w status oczekującym',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.challengeRepository.updateStatus(
      command.challengeId,
      ChallengeStatus.ACTIVE,
    );
  }
}
