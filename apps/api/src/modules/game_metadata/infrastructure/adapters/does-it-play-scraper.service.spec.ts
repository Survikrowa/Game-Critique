import { DoesItPlayScraperService } from './does-it-play-scraper.service';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('DoesItPlayScraperService', () => {
  let service: DoesItPlayScraperService;

  beforeAll(() => {
    service = new DoesItPlayScraperService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array when search fails', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    const result = await service.searchGame('nonexistent');
    expect(result).toEqual([]);
  });

  it('parses search results from JSON with default booleans', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          title: 'Elden Ring',
          platform: 'PS5',
          platformCode: 'ps5',
          testedOn: 'Base PS5',
          region: null,
          additionalInfo: null,
          cover: 'co4jni',
          url: 'game/Elden Ring/ps5/Base PS5',
        },
      ],
    });
    const result = await service.searchGame('Elden Ring');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Elden Ring');
    expect(result[0].has_physical_release).toBe(false);
    expect(result[0].has_game_on_disc).toBe(false);
  });

  it('returns null details when detail page fails', async () => {
    mockFetch.mockResolvedValue({ ok: false });
    const result = await service.getGameDetails('some/url');
    expect(result.offlinePlay).toBeNull();
    expect(result.downloadRequired).toBeNull();
  });

  it('maps offlinePlay=Yes to has_physical_release=true', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            title: 'Test',
            platform: 'PS5',
            testedOn: 'Base',
            url: 'test/url',
            platformCode: 'ps5',
            region: null,
            additionalInfo: null,
            cover: 'cover',
          },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          '<html><body>Offline play: Yes<br>(*)Download required: No</body></html>',
      });

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(true);
    expect(result[0].has_game_on_disc).toBe(true);
  });

  it('maps offlinePlay=No to has_physical_release=false', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            title: 'Test',
            platform: 'PS5',
            testedOn: 'Base',
            url: 'test/url',
            platformCode: 'ps5',
            region: null,
            additionalInfo: null,
            cover: 'cover',
          },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          '<html><body>Offline play: No<br>(*)Download required: Yes</body></html>',
      });

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(false);
    expect(result[0].has_game_on_disc).toBe(false);
  });

  it('handles asterisk suffixes in values', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            title: 'Test',
            platform: 'PS5',
            testedOn: 'Base',
            url: 'test/url',
            platformCode: 'ps5',
            region: null,
            additionalInfo: null,
            cover: 'cover',
          },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          '<html><body>Offline play: Yes*<br>(*)Download required: No*</body></html>',
      });

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(true);
    expect(result[0].has_game_on_disc).toBe(true);
  });

  it('returns empty array when no search results', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const result = await service.fetchGameData('NoGameLikeThis');
    expect(result).toEqual([]);
  });
});
