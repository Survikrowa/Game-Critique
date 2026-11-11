import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeclineChallengeCommand } from './decline_challenge.command';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus } from '@prisma/client';

@CommandHandler(DeclineChallengeCommand)
export class DeclineChallengeCommandHandler
  implements ICommandHandler<DeclineChallengeCommand>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(command: DeclineChallengeCommand) {
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
          message: 'Tylko odbiorca może odrzucać wyzwanie',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (challenge.status !== ChallengeStatus.PENDING) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Można odrzucić tylko oczekujące wyzwanie',
        },
        HttpStatus.CONFLICT,
      );
    }

    await this.challengeRepository.delete(command.challengeId);
    return true;
  }
}
