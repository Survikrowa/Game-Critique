import { IgdbRateLimiter } from './igdb_rate_limiter';

describe('IgdbRateLimiter', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('spaces requests by 250ms', async () => {
    const limiter = new IgdbRateLimiter();
    const starts: number[] = [];
    const task = () => {
      starts.push(Date.now());
      return Promise.resolve();
    };

    const first = limiter.run(task);
    const second = limiter.run(task);
    const third = limiter.run(task);

    await jest.advanceTimersByTimeAsync(0);
    await first;
    await jest.advanceTimersByTimeAsync(250);
    await second;
    await jest.advanceTimersByTimeAsync(250);
    await third;

    expect(starts[1] - starts[0]).toBeGreaterThanOrEqual(250);
    expect(starts[2] - starts[1]).toBeGreaterThanOrEqual(250);
  });
});
