import { GameStatusChangedChallengeHandler } from './game_status_changed.handler';
import { GameStatusChangedEvent } from '../../../notifications/application/events/game_status_changed.event';

const mockChallengeRepository = {
  findActiveForRecipient: jest.fn(),
  markCompleted: jest.fn(),
};

describe('GameStatusChangedChallengeHandler', () => {
  let handler: GameStatusChangedChallengeHandler;

  beforeEach(() => {
    handler = new GameStatusChangedChallengeHandler(
      mockChallengeRepository as never,
    );
    jest.clearAllMocks();
  });

  it('marks active challenges completed when game completed', async () => {
    mockChallengeRepository.findActiveForRecipient.mockResolvedValue([
      { id: 5 },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|1',
        7,
        'Game',
        'COMPLETED',
        null,
        null,
        [],
        5,
      ),
    );

    expect(mockChallengeRepository.findActiveForRecipient).toHaveBeenCalledWith(
      'auth0|1',
      7,
    );
    expect(mockChallengeRepository.markCompleted).toHaveBeenCalledWith(
      5,
      expect.any(Date),
    );
  });

  it('does nothing for non-completed status', async () => {
    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|1',
        7,
        'Game',
        'IN_PROGRESS',
        null,
        null,
        [],
        5,
      ),
    );
    expect(mockChallengeRepository.markCompleted).not.toHaveBeenCalled();
  });
});
