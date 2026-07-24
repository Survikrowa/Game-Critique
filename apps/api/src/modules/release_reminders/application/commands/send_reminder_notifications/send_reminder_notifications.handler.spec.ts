import { Test, TestingModule } from '@nestjs/testing';
import { SendReminderNotificationsHandler } from './send_reminder_notifications.handler';
import { GAME_REMINDER_REPOSITORY } from '../../../domain/ports/game_reminder.repository.port';
import { PUSH_TOKEN_REPOSITORY } from '../../../../notifications/domain/ports/push-token.repository.port';
import { NOTIFICATIONS_SERVICE } from '../../../../notifications/domain/ports/notifications.service.port';
import { PrismaService } from '../../../../database/prisma.service';
import { GameReminder } from '../../../domain/models/game_reminder.model';
import { PushToken } from '../../../../notifications/domain/models/push-token.model';

const mockReminderRepo = {
  findByDateRange: jest.fn(),
  update: jest.fn(),
};

const mockPushTokenRepo = {
  findByOauthId: jest.fn(),
};

const mockNotificationsService = {
  sendBulkPush: jest.fn(),
  sendPush: jest.fn(),
};

const mockPrisma = {
  notificationPreferences: {
    findUnique: jest.fn(),
  },
};

describe('SendReminderNotificationsHandler', () => {
  let handler: SendReminderNotificationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendReminderNotificationsHandler,
        { provide: GAME_REMINDER_REPOSITORY, useValue: mockReminderRepo },
        { provide: PUSH_TOKEN_REPOSITORY, useValue: mockPushTokenRepo },
        { provide: NOTIFICATIONS_SERVICE, useValue: mockNotificationsService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    handler = module.get<SendReminderNotificationsHandler>(
      SendReminderNotificationsHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends one-week reminder when game is 7 days away', async () => {
    const reminder = GameReminder.create(
      {
        oauthId: 'user1',
        igdbId: 123,
        gameName: 'Test Game',
        gameUrl: 'https://igdb.com/games/test',
        releaseDate: new Date(),
        coverUrl: null,
        notifiedOneWeek: false,
        notifiedReleaseDay: false,
        createdAt: new Date(),
      },
      1,
    );

    mockReminderRepo.findByDateRange
      .mockResolvedValueOnce([reminder])
      .mockResolvedValueOnce([]);

    mockPushTokenRepo.findByOauthId.mockResolvedValue([
      PushToken.create({ oauthId: 'user1', token: 'token1', platform: 'ios' }),
    ]);

    mockPrisma.notificationPreferences.findUnique.mockResolvedValue({
      releaseReminders: true,
    });

    mockNotificationsService.sendBulkPush.mockResolvedValue(1);

    await handler.execute();

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['token1'],
      'Za tydzień premiera!',
      expect.any(String),
      expect.objectContaining({ type: 'release_reminder', igdbId: 123 }),
    );

    expect(mockReminderRepo.update).toHaveBeenCalledWith(1, {
      notifiedOneWeek: true,
    });
  });

  it('skips users with releaseReminders disabled', async () => {
    const reminder = GameReminder.create(
      {
        oauthId: 'user1',
        igdbId: 123,
        gameName: 'Test Game',
        gameUrl: 'https://igdb.com/games/test',
        releaseDate: new Date(),
        coverUrl: null,
        notifiedOneWeek: false,
        notifiedReleaseDay: false,
        createdAt: new Date(),
      },
      1,
    );

    mockReminderRepo.findByDateRange
      .mockResolvedValueOnce([reminder])
      .mockResolvedValueOnce([]);

    mockPrisma.notificationPreferences.findUnique.mockResolvedValue({
      releaseReminders: false,
    });

    await handler.execute();

    expect(mockNotificationsService.sendBulkPush).not.toHaveBeenCalled();
  });

  it('sends release day reminder when game releases today', async () => {
    const reminder = GameReminder.create(
      {
        oauthId: 'user1',
        igdbId: 456,
        gameName: 'Today Game',
        gameUrl: 'https://igdb.com/games/today',
        releaseDate: new Date(),
        coverUrl: null,
        notifiedOneWeek: true,
        notifiedReleaseDay: false,
        createdAt: new Date(),
      },
      2,
    );

    mockReminderRepo.findByDateRange
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([reminder]);

    mockPushTokenRepo.findByOauthId.mockResolvedValue([
      PushToken.create({ oauthId: 'user1', token: 'token2', platform: 'ios' }),
    ]);

    mockPrisma.notificationPreferences.findUnique.mockResolvedValue({
      releaseReminders: true,
    });

    mockNotificationsService.sendBulkPush.mockResolvedValue(1);

    await handler.execute();

    expect(mockNotificationsService.sendBulkPush).toHaveBeenCalledWith(
      ['token2'],
      'Premiera już dziś!',
      expect.any(String),
      expect.objectContaining({ type: 'release_reminder', igdbId: 456 }),
    );

    expect(mockReminderRepo.update).toHaveBeenCalledWith(2, {
      notifiedReleaseDay: true,
    });
  });

  it('skips already notified reminders', async () => {
    const reminder = GameReminder.create(
      {
        oauthId: 'user1',
        igdbId: 789,
        gameName: 'Already Notified',
        gameUrl: 'https://igdb.com/games/notified',
        releaseDate: new Date(),
        coverUrl: null,
        notifiedOneWeek: true,
        notifiedReleaseDay: false,
        createdAt: new Date(),
      },
      3,
    );

    mockReminderRepo.findByDateRange
      .mockResolvedValueOnce([reminder])
      .mockResolvedValueOnce([]);

    mockPrisma.notificationPreferences.findUnique.mockResolvedValue({
      releaseReminders: true,
    });

    await handler.execute();

    expect(mockNotificationsService.sendBulkPush).not.toHaveBeenCalled();
  });
});
