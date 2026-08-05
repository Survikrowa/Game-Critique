import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../database/prisma.service';
import { GetYearlySummaryHandler } from './get_yearly_summary.handler';
import { GetYearlySummaryQuery } from './get_yearly_summary.query';

const completedIn = {
  hours: 1,
  minutes: 30,
  seconds: 0,
  id: 1,
  gamesStatusId: 1,
};

describe('GetYearlySummaryHandler', () => {
  let handler: GetYearlySummaryHandler;
  const findMany = jest.fn();
  const count = jest.fn();

  const mockPrisma = {
    gamesStatus: {
      findMany,
      count,
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetYearlySummaryHandler,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    handler = module.get(GetYearlySummaryHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all-time totals when year is null', async () => {
    findMany.mockResolvedValue([
      {
        id: 1,
        status: 'COMPLETED',
        score: '9.5',
        updatedAt: new Date('2024-06-01T00:00:00Z'),
        createdAt: new Date('2024-01-01T00:00:00Z'),
        completedIn,
      },
      {
        id: 2,
        status: 'COMPLETED',
        score: '8',
        updatedAt: new Date('2026-03-05T00:00:00Z'),
        createdAt: new Date('2026-01-10T00:00:00Z'),
        completedIn,
      },
    ]);
    count.mockResolvedValue(0);

    const result = await handler.execute(
      new GetYearlySummaryQuery(null, 'abc'),
    );

    expect(result.totalGames).toBe(2);
    expect(result.totalHours).toBe(3);
    expect(result.averageScore).toBe(8.8);
    expect(result.yearlyGames).toBe(2);
  });
});
