import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CompleteChallengeCommand } from './complete_challenge.command';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus, ChallengeType } from '@prisma/client';

@CommandHandler(CompleteChallengeCommand)
export class CompleteChallengeCommandHandler
  implements ICommandHandler<CompleteChallengeCommand>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(command: CompleteChallengeCommand) {
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
          message: 'Tylko odbiorca może zgłosić ukończenie',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (challenge.type !== ChallengeType.IN_GAME_CHALLENGE) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Wyzwanie w grze można zgłosić tylko ręcznie',
        },
        HttpStatus.CONFLICT,
      );
    }
    if (challenge.status !== ChallengeStatus.ACTIVE) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Wyzwanie nie jest aktywne' },
        HttpStatus.CONFLICT,
      );
    }

    return this.challengeRepository.updateStatus(
      command.challengeId,
      ChallengeStatus.AWAITING_CONFIRMATION,
    );
  }
}
