import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetChallengeGroupsQuery } from './get_challenge_groups.query';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
  ChallengeGroupWithMembers,
} from '../../../domain/ports/challenge-group.repository.port';

@QueryHandler(GetChallengeGroupsQuery)
export class GetChallengeGroupsQueryHandler
  implements IQueryHandler<GetChallengeGroupsQuery>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
  ) {}

  async execute(query: GetChallengeGroupsQuery) {
    const owned = await this.groupRepository.findMineByOwner(query.oauthId);
    const member = await this.groupRepository.findMineByMember(query.oauthId);
    const seen = new Map<number, ChallengeGroupWithMembers>();

    for (const group of owned) {
      seen.set(group.id, group);
    }
    for (const group of member) {
      if (!seen.has(group.id)) {
        seen.set(group.id, group);
      }
    }
    return Array.from(seen.values());
  }
}
