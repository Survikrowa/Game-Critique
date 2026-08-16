import { Test } from '@nestjs/testing';
import { CreateChallengeCommandHandler } from './create_challenge.handler';
import { CreateChallengeCommand } from './create_challenge.command';
import { CHALLENGE_GROUP_REPOSITORY } from '../../../domain/ports/challenge-group.repository.port';
import { CHALLENGE_REPOSITORY } from '../../../domain/ports/challenge.repository.port';
import {
  ChallengeStatus,
  ChallengeGroupMemberStatus,
  ChallengeType,
} from '@prisma/client';

import { GamesFacade } from '../../../../games/games.facade';

const mockGamesFacade = {
  getGameIdByHltbId: jest.fn(),
};

const mockGroupRepository = {
  getMember: jest.fn(),
  getActiveMembers: jest.fn(),
  findMember: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  saveMember: jest.fn(),
  acceptInvite: jest.fn(),
  declineInvite: jest.fn(),
  isInvitedFriend: jest.fn(),
  findMineByOwner: jest.fn(),
  findMineByMember: jest.fn(),
};

const mockChallengeRepository = {
  save: jest.fn(),
  findById: jest.fn(),
  findByGroup: jest.fn(),
  findActiveForRecipient: jest.fn(),
  updateStatus: jest.fn(),
  markCompleted: jest.fn(),
  markForfeited: jest.fn(),
  completeCountFor: jest.fn(),
  forfeitCountFor: jest.fn(),
  delete: jest.fn(),
};

describe('CreateChallengeCommandHandler', () => {
  let handler: CreateChallengeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateChallengeCommandHandler,
        { provide: CHALLENGE_GROUP_REPOSITORY, useValue: mockGroupRepository },
        { provide: CHALLENGE_REPOSITORY, useValue: mockChallengeRepository },
        { provide: GamesFacade, useValue: mockGamesFacade },
      ],
    }).compile();
    handler = moduleRef.get(CreateChallengeCommandHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('creates challenge when both members active', async () => {
    const activeMember = { status: ChallengeGroupMemberStatus.ACTIVE };
    mockGroupRepository.findMember
      .mockResolvedValueOnce(activeMember)
      .mockResolvedValueOnce(activeMember);
    mockGamesFacade.getGameIdByHltbId.mockResolvedValue(42);
    mockChallengeRepository.save.mockResolvedValue({ id: 10 });

    const result = await handler.execute(
      new CreateChallengeCommand(1, 'a', 'b', ChallengeType.BEAT_GAME, 5, null),
    );

    expect(result.id).toBe(10);
    expect(mockGamesFacade.getGameIdByHltbId).toHaveBeenCalledWith(5);
    expect(mockGroupRepository.findMember).toHaveBeenCalledTimes(2);
    expect(mockGroupRepository.findMember).toHaveBeenCalledWith(1, 'a');
    expect(mockGroupRepository.findMember).toHaveBeenCalledWith(1, 'b');
    expect(mockChallengeRepository.save).toHaveBeenCalledTimes(1);
    expect(mockChallengeRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: ChallengeStatus.PENDING,
        challengerId: 'a',
        recipientId: 'b',
        gameId: 42,
      }),
    );
  });

  it('throws when challenging self', async () => {
    await expect(
      handler.execute(
        new CreateChallengeCommand(
          1,
          'a',
          'a',
          ChallengeType.BEAT_GAME,
          5,
          null,
        ),
      ),
    ).rejects.toThrow('Nie możesz rzucić sobie samemu wyzwania');
    expect(mockGroupRepository.findMember).not.toHaveBeenCalled();
  });

  it('throws when challenger is not an active member', async () => {
    mockGroupRepository.findMember.mockResolvedValueOnce(null);

    await expect(
      handler.execute(
        new CreateChallengeCommand(
          1,
          'a',
          'b',
          ChallengeType.BEAT_GAME,
          5,
          null,
        ),
      ),
    ).rejects.toThrow('Musisz być aktywnym członkiem grupy');
    expect(mockChallengeRepository.save).not.toHaveBeenCalled();
  });

  it('throws when recipient is not an active member', async () => {
    mockGroupRepository.findMember
      .mockResolvedValueOnce({ status: ChallengeGroupMemberStatus.ACTIVE })
      .mockResolvedValueOnce(null);

    await expect(
      handler.execute(
        new CreateChallengeCommand(
          1,
          'a',
          'b',
          ChallengeType.BEAT_GAME,
          5,
          null,
        ),
      ),
    ).rejects.toThrow('Odbiorca nie jest aktywnym członkiem grupy');
    expect(mockChallengeRepository.save).not.toHaveBeenCalled();
  });
});
