import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChallengeCommand } from './create_challenge.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { Challenge } from '../../../domain/models/challenge.model';
import { GamesFacade } from '../../../../games/games.facade';
import { ChallengeGroupMemberStatus, ChallengeStatus } from '@prisma/client';

@CommandHandler(CreateChallengeCommand)
export class CreateChallengeCommandHandler
  implements ICommandHandler<CreateChallengeCommand>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
    private readonly gamesFacade: GamesFacade,
  ) {}

  async execute(command: CreateChallengeCommand) {
    if (command.challengerOauthId === command.recipientOauthId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Nie możesz rzucić sobie samemu wyzwania',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const challengerMember = await this.groupRepository.findMember(
      command.groupId,
      command.challengerOauthId,
    );
    if (
      !challengerMember ||
      challengerMember.status !== ChallengeGroupMemberStatus.ACTIVE
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Musisz być aktywnym członkiem grupy',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const recipientMember = await this.groupRepository.findMember(
      command.groupId,
      command.recipientOauthId,
    );
    if (
      !recipientMember ||
      recipientMember.status !== ChallengeGroupMemberStatus.ACTIVE
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Odbiorca nie jest aktywnym członkiem grupy',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const gameId = await this.gamesFacade.getGameIdByHltbId(command.gameId);

    return this.challengeRepository.save(
      Challenge.create({
        groupId: command.groupId,
        challengerId: command.challengerOauthId,
        recipientId: command.recipientOauthId,
        type: command.type,
        status: ChallengeStatus.PENDING,
        gameId,
        description: command.description,
        completedAt: null,
        forfeitedAt: null,
      }),
    );
  }
}
