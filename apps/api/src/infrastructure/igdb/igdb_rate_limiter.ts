const MIN_INTERVAL_MS = 250;
const MAX_CONCURRENT = 8;

export class IgdbRateLimiter {
  private lastStartedAt = 0;
  private active = 0;
  private queue: Array<() => void> = [];

  run = async <T>(task: () => Promise<T>): Promise<T> => {
    await this.acquire();
    try {
      return await task();
    } finally {
      this.release();
    }
  };

  private acquire = async (): Promise<void> => {
    while (this.active >= MAX_CONCURRENT) {
      await new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.active += 1;
    const waitFor = Math.max(
      0,
      this.lastStartedAt + MIN_INTERVAL_MS - Date.now(),
    );
    this.lastStartedAt = Date.now() + waitFor;
    if (waitFor > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitFor));
    }
  };

  private release = (): void => {
    this.active -= 1;
    const next = this.queue.shift();
    if (next) next();
  };
}
