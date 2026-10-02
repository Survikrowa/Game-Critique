import { Test } from '@nestjs/testing';
import { ConfirmChallengeCompletionCommandHandler } from './confirm_challenge_completion.handler';
import { ConfirmChallengeCompletionCommand } from './confirm_challenge_completion.command';
import { CHALLENGE_REPOSITORY } from '../../../domain/ports/challenge.repository.port';
import { ChallengeStatus } from '@prisma/client';

const mockChallengeRepository = {
  findById: jest.fn(),
  markCompleted: jest.fn(),
};

describe('ConfirmChallengeCompletionCommandHandler', () => {
  let handler: ConfirmChallengeCompletionCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfirmChallengeCompletionCommandHandler,
        { provide: CHALLENGE_REPOSITORY, useValue: mockChallengeRepository },
      ],
    }).compile();
    handler = moduleRef.get(ConfirmChallengeCompletionCommandHandler);
  });

  beforeEach(() => jest.clearAllMocks());

  it('marks awaiting challenge completed by challenger', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      challengerId: 'challenger',
      status: ChallengeStatus.AWAITING_CONFIRMATION,
    });
    mockChallengeRepository.markCompleted.mockResolvedValue({ id: 1 });

    const result = await handler.execute(
      new ConfirmChallengeCompletionCommand(1, 'challenger'),
    );

    expect(result.id).toBe(1);
    expect(mockChallengeRepository.markCompleted).toHaveBeenCalledWith(
      1,
      expect.any(Date),
    );
  });

  it('throws 403 for non-challenger', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      challengerId: 'challenger',
      status: ChallengeStatus.AWAITING_CONFIRMATION,
    });

    await expect(
      handler.execute(new ConfirmChallengeCompletionCommand(1, 'other')),
    ).rejects.toThrow('Tylko rzucający może potwierdzić ukończenie');
    expect(mockChallengeRepository.markCompleted).not.toHaveBeenCalled();
  });

  it('throws 409 when not awaiting confirmation', async () => {
    mockChallengeRepository.findById.mockResolvedValue({
      id: 1,
      challengerId: 'challenger',
      status: ChallengeStatus.ACTIVE,
    });

    await expect(
      handler.execute(new ConfirmChallengeCompletionCommand(1, 'challenger')),
    ).rejects.toThrow('Wyzwanie nie oczekuje na potwierdzenie');
    expect(mockChallengeRepository.markCompleted).not.toHaveBeenCalled();
  });
});
