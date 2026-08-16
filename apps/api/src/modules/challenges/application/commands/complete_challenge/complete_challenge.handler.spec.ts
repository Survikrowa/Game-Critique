import { Test } from '@nestjs/testing';
import { CompleteChallengeCommandHandler } from './complete_challenge.handler';
import { CompleteChallengeCommand } from './complete_challenge.command';
import { CHALLENGE_REPOSITORY } from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus, ChallengeType } from '@prisma/client';

const mockChallengeRepository = {
  findById: jest.fn(),
  updateStatus: jest.fn(),
};

describe('CompleteChallengeCommandHandler', () => {
  let handler: CompleteChallengeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CompleteChallengeCommandHandler,
        { provide: CHALLENGE_REPOSITORY, useValue: mockChallengeRepository },
      ],
    }).compile();
    handler = moduleRef.get(CompleteChallengeCommandHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('moves active challenge to awaiting confirmation for recipient', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      recipientId: 'recipient',
      type: ChallengeType.IN_GAME_CHALLENGE,
      status: ChallengeStatus.ACTIVE,
    });
    mockChallengeRepository.updateStatus.mockResolvedValue({ id: 1 });

    const result = await handler.execute(
      new CompleteChallengeCommand(1, 'recipient'),
    );

    expect(result.id).toBe(1);
    expect(mockChallengeRepository.updateStatus).toHaveBeenCalledWith(
      1,
      ChallengeStatus.AWAITING_CONFIRMATION,
    );
  });

  it('throws 403 for non-recipient', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      recipientId: 'recipient',
      type: ChallengeType.IN_GAME_CHALLENGE,
      status: ChallengeStatus.ACTIVE,
    });

    await expect(
      handler.execute(new CompleteChallengeCommand(1, 'other')),
    ).rejects.toThrow('Tylko odbiorca może zgłosić ukończenie');
    expect(mockChallengeRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('throws 409 when challenge is not in-game type', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      recipientId: 'recipient',
      type: ChallengeType.BEAT_GAME,
      status: ChallengeStatus.ACTIVE,
    });

    await expect(
      handler.execute(new CompleteChallengeCommand(1, 'recipient')),
    ).rejects.toThrow('Wyzwanie w grze można zgłosić tylko ręcznie');
    expect(mockChallengeRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('throws 409 when challenge is not active', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      recipientId: 'recipient',
      type: ChallengeType.IN_GAME_CHALLENGE,
      status: ChallengeStatus.PENDING,
    });

    await expect(
      handler.execute(new CompleteChallengeCommand(1, 'recipient')),
    ).rejects.toThrow('Wyzwanie nie jest aktywne');
    expect(mockChallengeRepository.updateStatus).not.toHaveBeenCalled();
  });
});
