import { Test, TestingModule } from '@nestjs/testing';
import { AddReminderHandler } from './add_reminder.handler';
import { AddReminderCommand } from './add_reminder.command';
import {
  GAME_REMINDER_REPOSITORY,
  GameReminderRepositoryPort,
} from '../../../domain/ports/game_reminder.repository.port';
import { GameReminder } from '../../../domain/models/game_reminder.model';

const mockRepository: jest.Mocked<GameReminderRepositoryPort> = {
  save: jest.fn(),
  findByOauthId: jest.fn(),
  findByOauthIdAndIgdbId: jest.fn(),
  findByDateRange: jest.fn(),
  update: jest.fn(),
  deleteByOauthIdAndIgdbId: jest.fn(),
};

describe('AddReminderHandler', () => {
  let handler: AddReminderHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddReminderHandler,
        {
          provide: GAME_REMINDER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get<AddReminderHandler>(AddReminderHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new reminder when none exists', async () => {
    mockRepository.findByOauthIdAndIgdbId.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue(
      GameReminder.create(
        {
          oauthId: 'user1',
          igdbId: 123,
          gameName: 'Test Game',
          gameUrl: 'https://igdb.com/games/test',
          releaseDate: new Date('2099-01-01'),
          coverUrl: null,
          notifiedOneWeek: false,
          notifiedReleaseDay: false,
          createdAt: new Date(),
        },
        1,
      ),
    );

    const result = await handler.execute(
      new AddReminderCommand('user1', {
        igdbId: 123,
        gameName: 'Test Game',
        gameUrl: 'https://igdb.com/games/test',
        releaseDate: new Date('2099-01-01'),
      }),
    );

    expect(result.igdbId).toBe(123);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('returns existing reminder if already exists', async () => {
    const existing = GameReminder.create(
      {
        oauthId: 'user1',
        igdbId: 123,
        gameName: 'Test Game',
        gameUrl: 'https://igdb.com/games/test',
        releaseDate: new Date('2099-01-01'),
        coverUrl: null,
        notifiedOneWeek: false,
        notifiedReleaseDay: false,
        createdAt: new Date(),
      },
      1,
    );
    mockRepository.findByOauthIdAndIgdbId.mockResolvedValue(existing);

    const result = await handler.execute(
      new AddReminderCommand('user1', {
        igdbId: 123,
        gameName: 'Test Game',
        gameUrl: 'https://igdb.com/games/test',
        releaseDate: new Date('2099-01-01'),
      }),
    );

    expect(result.igdbId).toBe(123);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('throws error for past release date', async () => {
    mockRepository.findByOauthIdAndIgdbId.mockResolvedValue(null);

    await expect(
      handler.execute(
        new AddReminderCommand('user1', {
          igdbId: 123,
          gameName: 'Test Game',
          gameUrl: 'https://igdb.com/games/test',
          releaseDate: new Date('2020-01-01'),
        }),
      ),
    ).rejects.toThrow(
      'Cannot set reminder for a game that has already been released',
    );

    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
