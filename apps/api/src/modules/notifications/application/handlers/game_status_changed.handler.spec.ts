import { Test, TestingModule } from '@nestjs/testing';
import { GameStatusChangedHandler } from './game_status_changed.handler';
import { GameStatusChangedEvent } from '../events/game_status_changed.event';
import { PUSH_TOKEN_REPOSITORY } from '../../domain/ports/push-token.repository.port';
import { NOTIFICATIONS_SERVICE } from '../../domain/ports/notifications.service.port';
import { PrismaService } from '../../../database/prisma.service';
import { PushToken } from '../../domain/models/push-token.model';

const mockPrisma = {
  profile: { findUnique: jest.fn() },
  gamesStatus: { findMany: jest.fn() },
  notificationPreferences: { findMany: jest.fn() },
  pushToken: { findMany: jest.fn() },
};

const mockPushTokenRepo = {
  save: jest.fn(),
  findByOauthId: jest.fn(),
  findByToken: jest.fn(),
  deleteByToken: jest.fn(),
};

const mockNotificationsService = {
  sendPush: jest.fn(),
  sendBulkPush: jest.fn(),
};

describe('GameStatusChangedHandler', () => {
  let handler: GameStatusChangedHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameStatusChangedHandler,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: PUSH_TOKEN_REPOSITORY, useValue: mockPushTokenRepo },
        { provide: NOTIFICATIONS_SERVICE, useValue: mockNotificationsService },
      ],
    }).compile();

    handler = module.get<GameStatusChangedHandler>(GameStatusChangedHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends push to all friends when game is COMPLETED with score', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Jan' });
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'friend1', friendActivity: true },
      { oauthId: 'friend2', friendActivity: true },
    ]);
    mockPrisma.pushToken.findMany.mockResolvedValue([
      { token: 'tok1', oauthId: 'friend1', platform: 'ios' },
      { token: 'tok2', oauthId: 'friend2', platform: 'android' },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|jan',
        123,
        'Elden Ring',
        'COMPLETED',
        '9',
        null,
        ['friend1', 'friend2'],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['tok1', 'tok2'],
      'Aktywność znajomych',
      'Jan ukończył Elden Ring i dał 9/10',
      { type: 'game', hltbId: 123 },
    );
  });

  it('sends push to all friends when game is COMPLETED without score', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Anna' });
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'friend1', friendActivity: true },
    ]);
    mockPrisma.pushToken.findMany.mockResolvedValue([
      { token: 'tok1', oauthId: 'friend1', platform: 'ios' },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|anna',
        456,
        'Hollow Knight',
        'COMPLETED',
        null,
        null,
        ['friend1'],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['tok1'],
      'Aktywność znajomych',
      'Anna ukończył Hollow Knight',
      { type: 'game', hltbId: 456 },
    );
  });

  it('sends push only to friends who have the game when IN_PROGRESS', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Maria' });
    mockPrisma.gamesStatus.findMany.mockResolvedValue([{ oauthId: 'friend1' }]);
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'friend1', friendActivity: true },
    ]);
    mockPrisma.pushToken.findMany.mockResolvedValue([
      { token: 'tok1', oauthId: 'friend1', platform: 'ios' },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|maria',
        789,
        'Cyberpunk 2077',
        'IN_PROGRESS',
        null,
        null,
        ['friend1', 'friend2'],
      ),
    );

    expect(mockPrisma.gamesStatus.findMany).toHaveBeenCalledWith({
      where: { oauthId: { in: ['friend1', 'friend2'] }, gameId: 789 },
      select: { oauthId: true },
    });
    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['tok1'],
      'Aktywność znajomych',
      'Maria zaczął grać w Cyberpunk 2077',
      { type: 'game', hltbId: 789 },
    );
  });

  it('filters out friends with notification preferences disabled', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Tomek' });
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'friend1', friendActivity: false },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|tomek',
        111,
        "Baldur's Gate 3",
        'COMPLETED',
        '10',
        null,
        ['friend1'],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).not.toHaveBeenCalled();
  });

  it('does nothing when no friends provided', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Ktoś' });

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|x',
        222,
        'Game',
        'COMPLETED',
        null,
        null,
        [],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).not.toHaveBeenCalled();
  });

  it('uses default name when profile has no name', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue(null);
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'f1', friendActivity: true },
    ]);
    mockPrisma.pushToken.findMany.mockResolvedValue([
      { token: 'tok1', oauthId: 'f1', platform: 'ios' },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|x',
        333,
        'Game',
        'COMPLETED',
        '8',
        null,
        ['f1'],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['tok1'],
      'Aktywność znajomych',
      'Ktoś ukończył Game i dał 8/10',
      { type: 'game', hltbId: 333 },
    );
  });

  it('sends push when friend writes a review', async () => {
    mockPrisma.profile.findUnique.mockResolvedValue({ name: 'Piotr' });
    mockPrisma.notificationPreferences.findMany.mockResolvedValue([
      { oauthId: 'f1', friendActivity: true },
    ]);
    mockPrisma.pushToken.findMany.mockResolvedValue([
      { token: 'tok1', oauthId: 'f1', platform: 'ios' },
    ]);

    await handler.handle(
      new GameStatusChangedEvent(
        'auth0|piotr',
        444,
        'Disco Elysium',
        'RETIRED',
        null,
        'Świetna gra, polecam!',
        ['f1'],
      ),
    );

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['tok1'],
      'Aktywność znajomych',
      'Piotr napisał recenzję Disco Elysium',
      { type: 'game', hltbId: 444 },
    );
  });
});
