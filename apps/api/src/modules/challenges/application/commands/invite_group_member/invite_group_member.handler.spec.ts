import { Test } from '@nestjs/testing';
import { InviteGroupMemberCommandHandler } from './invite_group_member.handler';
import { InviteGroupMemberCommand } from './invite_group_member.command';
import { CHALLENGE_GROUP_REPOSITORY } from '../../../domain/ports/challenge-group.repository.port';
import { ChallengeGroupMemberStatus } from '@prisma/client';

const mockGroupRepository = {
  findMember: jest.fn(),
  isInvitedFriend: jest.fn(),
  saveMember: jest.fn(),
};

describe('InviteGroupMemberCommandHandler', () => {
  let handler: InviteGroupMemberCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InviteGroupMemberCommandHandler,
        { provide: CHALLENGE_GROUP_REPOSITORY, useValue: mockGroupRepository },
      ],
    }).compile();
    handler = moduleRef.get(InviteGroupMemberCommandHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('invites a friend when inviter is an active member', async () => {
    mockGroupRepository.findMember
      .mockResolvedValueOnce({
        status: ChallengeGroupMemberStatus.ACTIVE,
      })
      .mockResolvedValueOnce(null);
    mockGroupRepository.isInvitedFriend.mockResolvedValue(true);
    mockGroupRepository.saveMember.mockResolvedValue({ oauthId: 'friend' });

    const result = await handler.execute(
      new InviteGroupMemberCommand(1, 'inviter', 'friend'),
    );

    expect(result.oauthId).toBe('friend');
    expect(mockGroupRepository.findMember).toHaveBeenCalledWith(1, 'inviter');
    expect(mockGroupRepository.isInvitedFriend).toHaveBeenCalledWith(
      'inviter',
      'friend',
    );
  });

  it('throws 403 when inviter is not active member', async () => {
    mockGroupRepository.findMember.mockResolvedValue({ status: 'INVITED' });

    await expect(
      handler.execute(new InviteGroupMemberCommand(1, 'inviter', 'friend')),
    ).rejects.toThrow('Musisz być aktywnym członkiem grupy, aby zapraszać');
    expect(mockGroupRepository.isInvitedFriend).not.toHaveBeenCalled();
  });

  it('throws 403 when inviter is not a member at all', async () => {
    mockGroupRepository.findMember.mockResolvedValue(null);

    await expect(
      handler.execute(new InviteGroupMemberCommand(1, 'outsider', 'friend')),
    ).rejects.toThrow('Musisz być aktywnym członkiem grupy, aby zapraszać');
    expect(mockGroupRepository.isInvitedFriend).not.toHaveBeenCalled();
  });
});
