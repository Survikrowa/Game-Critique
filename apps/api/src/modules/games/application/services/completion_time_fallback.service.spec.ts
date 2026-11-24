import { GameDataSource } from '@prisma/client';
import { CompletionTimeFallbackService } from './completion_time_fallback.service';

const prisma = {
  gameCompletionTime: { upsert: jest.fn().mockResolvedValue({}) },
};
const registry = {
  bySource: jest.fn(),
};
const igdb = {
  getCompletionTimes: jest.fn(),
};
const hltb = {
  getCompletionTimes: jest.fn(),
};

describe('CompletionTimeFallbackService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    registry.bySource.mockImplementation((source: GameDataSource) =>
      source === GameDataSource.IGDB ? igdb : hltb,
    );
  });

  it('does not call providers when times already exist', async () => {
    const service = new CompletionTimeFallbackService(
      prisma as never,
      registry as never,
    );
    const result = await service.resolve({
      gameId: 1,
      name: 'Game',
      completionTime: { main: 100, mainExtra: 0, completionist: 0 },
      sources: [],
    });

    expect(result).toEqual({
      main: 100,
      mainExtra: 0,
      completionist: 0,
    });
    expect(igdb.getCompletionTimes).not.toHaveBeenCalled();
  });

  it('fills missing times from IGDB', async () => {
    igdb.getCompletionTimes.mockResolvedValue({
      main: 100,
      mainExtra: 200,
      completionist: 300,
    });
    const service = new CompletionTimeFallbackService(
      prisma as never,
      registry as never,
    );

    const result = await service.resolve({
      gameId: 1,
      name: 'Game',
      completionTime: { main: 0, mainExtra: 0, completionist: 0 },
      sources: [{ source: GameDataSource.IGDB, externalId: '10' }],
    });

    expect(result).toEqual({
      main: 100,
      mainExtra: 200,
      completionist: 300,
    });
    expect(hltb.getCompletionTimes).not.toHaveBeenCalled();
    expect(prisma.gameCompletionTime.upsert).toHaveBeenCalled();
  });

  it('falls back to HLTB when IGDB has no times', async () => {
    igdb.getCompletionTimes.mockResolvedValue(null);
    hltb.getCompletionTimes.mockResolvedValue({
      main: 50,
      mainExtra: 60,
      completionist: 70,
    });
    const service = new CompletionTimeFallbackService(
      prisma as never,
      registry as never,
    );

    const result = await service.resolve({
      gameId: 1,
      name: 'Game',
      completionTime: null,
      sources: [{ source: GameDataSource.HLTB, externalId: '99' }],
    });

    expect(result).toEqual({
      main: 50,
      mainExtra: 60,
      completionist: 70,
    });
    expect(hltb.getCompletionTimes).toHaveBeenCalled();
  });
});
