import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ForfeitChallengeCommand } from './forfeit_challenge.command';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus } from '@prisma/client';

@CommandHandler(ForfeitChallengeCommand)
export class ForfeitChallengeCommandHandler
  implements ICommandHandler<ForfeitChallengeCommand>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(command: ForfeitChallengeCommand) {
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
          message: 'Tylko odbiorca może się poddać',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (challenge.status !== ChallengeStatus.ACTIVE) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Wyzwanie nie jest aktywne' },
        HttpStatus.CONFLICT,
      );
    }

    return this.challengeRepository.markForfeited(
      command.challengeId,
      new Date(),
    );
  }
}
