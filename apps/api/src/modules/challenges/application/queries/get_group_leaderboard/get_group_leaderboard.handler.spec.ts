import { Test } from '@nestjs/testing';
import { GetGroupLeaderboardQueryHandler } from './get_group_leaderboard.handler';
import { GetGroupLeaderboardQuery } from './get_group_leaderboard.query';
import { CHALLENGE_GROUP_REPOSITORY } from '../../../domain/ports/challenge-group.repository.port';
import { CHALLENGE_REPOSITORY } from '../../../domain/ports/challenge.repository.port';
import { PrismaService } from '../../../../database/prisma.service';
import { ChallengeGroupMemberStatus } from '@prisma/client';

const mockGroupRepository = {
  findMember: jest.fn(),
  getActiveMembers: jest.fn(),
};

const mockChallengeRepository = {
  completeCountFor: jest.fn(),
  forfeitCountFor: jest.fn(),
};

const mockPrisma = {
  profile: { findMany: jest.fn() },
};

describe('GetGroupLeaderboardQueryHandler', () => {
  let handler: GetGroupLeaderboardQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetGroupLeaderboardQueryHandler,
        { provide: CHALLENGE_GROUP_REPOSITORY, useValue: mockGroupRepository },
        { provide: CHALLENGE_REPOSITORY, useValue: mockChallengeRepository },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    handler = moduleRef.get(GetGroupLeaderboardQueryHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('returns leaderboard sorted by completedCount descending', async () => {
    mockGroupRepository.findMember.mockResolvedValue({
      status: ChallengeGroupMemberStatus.ACTIVE,
    });
    mockGroupRepository.getActiveMembers.mockResolvedValue([
      { oauthId: 'a' },
      { oauthId: 'b' },
    ]);
    mockPrisma.profile.findMany.mockResolvedValue([
      { oauthId: 'a', name: 'Ala', avatarUrl: '1' },
      { oauthId: 'b', name: 'Ben', avatarUrl: '2' },
    ]);
    mockChallengeRepository.completeCountFor
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(5);
    mockChallengeRepository.forfeitCountFor
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(1);

    const result = await handler.execute(new GetGroupLeaderboardQuery(1, 'me'));

    expect(result[0].oauthId).toBe('b');
    expect(result[0].completedCount).toBe(5);
    expect(mockChallengeRepository.completeCountFor).toHaveBeenCalledWith(
      'a',
      1,
    );
    expect(mockChallengeRepository.completeCountFor).toHaveBeenCalledWith(
      'b',
      1,
    );
    expect(mockChallengeRepository.forfeitCountFor).toHaveBeenCalledTimes(2);
  });

  it('throws for non-member', async () => {
    mockGroupRepository.findMember.mockResolvedValue(null);
    await expect(
      handler.execute(new GetGroupLeaderboardQuery(1, 'outsider')),
    ).rejects.toThrow();
  });
});
