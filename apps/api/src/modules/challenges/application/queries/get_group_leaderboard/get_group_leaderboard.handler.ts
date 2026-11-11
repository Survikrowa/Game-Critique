import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { GetGroupLeaderboardQuery } from './get_group_leaderboard.query';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../../domain/ports/challenge.repository.port';
import { PrismaService } from '../../../../database/prisma.service';
import { ChallengeGroupMemberStatus } from '@prisma/client';

export type LeaderboardEntryDTO = {
  oauthId: string;
  name: string;
  avatarUrl: string;
  completedCount: number;
  forfeitedCount: number;
};

@QueryHandler(GetGroupLeaderboardQuery)
export class GetGroupLeaderboardQueryHandler
  implements IQueryHandler<GetGroupLeaderboardQuery>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    query: GetGroupLeaderboardQuery,
  ): Promise<LeaderboardEntryDTO[]> {
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

    const activeMembers = await this.groupRepository.getActiveMembers(
      query.groupId,
    );
    const profiles = await this.prisma.profile.findMany({
      where: { oauthId: { in: activeMembers.map((m) => m.oauthId) } },
    });
    const profileByOauth = new Map(profiles.map((p) => [p.oauthId, p]));

    const entries: LeaderboardEntryDTO[] = await Promise.all(
      activeMembers.map(async (m) => {
        const completedCount = await this.challengeRepository.completeCountFor(
          m.oauthId,
          query.groupId,
        );
        const forfeitedCount = await this.challengeRepository.forfeitCountFor(
          m.oauthId,
          query.groupId,
        );
        const profile = profileByOauth.get(m.oauthId);
        return {
          oauthId: m.oauthId,
          name: profile?.name ?? '',
          avatarUrl: profile?.avatarUrl ?? '',
          completedCount,
          forfeitedCount,
        };
      }),
    );

    return entries.sort((a, b) => b.completedCount - a.completedCount);
  }
}
