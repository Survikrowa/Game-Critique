import { of } from 'rxjs';
import { IgdbService } from './igdb.service';

const http = { post: jest.fn() };
const config = { get: jest.fn((key: string) => key) };
const limiter = { run: jest.fn((task: () => unknown) => task()) };

describe('IgdbService', () => {
  beforeEach(() => {
    http.post.mockReset();
    limiter.run.mockReset();
    limiter.run.mockImplementation((task: () => unknown) => task());
    config.get.mockReset();
    config.get.mockImplementation((key: string) => key);
  });

  it('parses game_time_to_beats response', async () => {
    http.post.mockReturnValue(
      of({ data: [{ game_id: 1022, hastily: 100, normally: 200 }] }),
    );
    const service = new IgdbService(
      http as never,
      config as never,
      limiter as never,
    );

    const times = await service.getTimeToBeats([1022]);

    expect(times.get(1022)).toEqual({
      main: 100,
      mainExtra: 200,
      completionist: null,
    });
  });

  it('returns empty map on malformed response', async () => {
    http.post.mockReturnValue(of({ data: [{ bad: true }] }));
    const service = new IgdbService(
      http as never,
      config as never,
      limiter as never,
    );

    const times = await service.getTimeToBeats([1]);

    expect(times.size).toBe(0);
  });

  it('retries without the last token when IGDB finds no exact match', async () => {
    http.post
      .mockReturnValueOnce(
        of({
          data: {
            access_token: 'token',
            expires_in: 86400,
            token_type: 'bearer',
          },
        }),
      )
      .mockReturnValueOnce(of({ data: [] }))
      .mockReturnValueOnce(
        of({
          data: [
            {
              id: 1,
              name: "Baldur's Gate III",
              slug: 'baldur-s-gate-iii',
            },
          ],
        }),
      );

    const service = new IgdbService(
      http as never,
      config as never,
      limiter as never,
    );

    const games = await service.searchGames('baldur g', 5);

    expect(games).toHaveLength(1);
    expect(games[0].id).toBe(1);
    expect(http.post).toHaveBeenCalledTimes(3);
    expect(http.post.mock.calls[1][1]).toContain('search "baldur g";');
    expect(http.post.mock.calls[2][1]).toContain('search "baldur";');
  });

  it('does not retry when the full query matches', async () => {
    http.post
      .mockReturnValueOnce(
        of({
          data: {
            access_token: 'token',
            expires_in: 86400,
            token_type: 'bearer',
          },
        }),
      )
      .mockReturnValueOnce(
        of({
          data: [
            {
              id: 1,
              name: "Baldur's Gate III",
              slug: 'baldur-s-gate-iii',
            },
          ],
        }),
      );

    const service = new IgdbService(
      http as never,
      config as never,
      limiter as never,
    );

    const games = await service.searchGames('baldur gate', 5);

    expect(games).toHaveLength(1);
    expect(http.post).toHaveBeenCalledTimes(2);
  });

  it('does not retry a single-token query', async () => {
    http.post
      .mockReturnValueOnce(
        of({
          data: {
            access_token: 'token',
            expires_in: 86400,
            token_type: 'bearer',
          },
        }),
      )
      .mockReturnValueOnce(of({ data: [] }));

    const service = new IgdbService(
      http as never,
      config as never,
      limiter as never,
    );

    const games = await service.searchGames('baldur', 5);

    expect(games).toEqual([]);
    expect(http.post).toHaveBeenCalledTimes(2);
  });
});
