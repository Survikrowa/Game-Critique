import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { GetChallengesQuery } from './get_challenges.query';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { ChallengeGroupMemberStatus } from '@prisma/client';

@QueryHandler(GetChallengesQuery)
export class GetChallengesQueryHandler
  implements IQueryHandler<GetChallengesQuery>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async execute(query: GetChallengesQuery) {
    const member = await this.groupRepository.findMember(
      query.groupId,
      query.oauthId,
    );
    if (!member || member.status !== ChallengeGroupMemberStatus.ACTIVE) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Nie jesteś aktywnym członkiem',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.challengeRepository.findByGroup(query.groupId, query.status);
  }
}
