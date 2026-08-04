import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { DoesItPlayScraperService } from './does-it-play-scraper.service';

const mockGet = jest.fn();
const mockHttpService = { get: mockGet } as unknown as HttpService;

describe('DoesItPlayScraperService', () => {
  let service: DoesItPlayScraperService;

  beforeAll(() => {
    service = new DoesItPlayScraperService(mockHttpService);
  });

  beforeEach(() => {
    mockGet.mockClear();
  });

  it('returns empty array when search fails', async () => {
    mockGet.mockReturnValue(of({}));
    const result = await service.searchGame('nonexistent');
    expect(result).toEqual([]);
  });

  it('parses search results from JSON with default booleans', async () => {
    mockGet.mockReturnValue(
      of({
        data: [
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
      }),
    );
    const result = await service.searchGame('Elden Ring');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Elden Ring');
    expect(result[0].has_physical_release).toBe(false);
    expect(result[0].has_game_on_disc).toBe(false);
  });

  it('returns null details when detail page fails', async () => {
    mockGet.mockReturnValue(of({}));
    const result = await service.getGameDetails('some/url');
    expect(result.offlinePlay).toBeNull();
    expect(result.downloadRequired).toBeNull();
  });

  it('maps offlinePlay=Yes to has_physical_release=true', async () => {
    mockGet
      .mockReturnValueOnce(
        of({
          data: [
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
        }),
      )
      .mockReturnValueOnce(
        of({
          data: '<html><body>Offline play: Yes<br>(*)Download required: No</body></html>',
        }),
      );

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(true);
    expect(result[0].has_game_on_disc).toBe(true);
  });

  it('maps offlinePlay=No to has_physical_release=false', async () => {
    mockGet
      .mockReturnValueOnce(
        of({
          data: [
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
        }),
      )
      .mockReturnValueOnce(
        of({
          data: '<html><body>Offline play: No<br>(*)Download required: Yes</body></html>',
        }),
      );

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(false);
    expect(result[0].has_game_on_disc).toBe(false);
  });

  it('handles asterisk suffixes in values', async () => {
    mockGet
      .mockReturnValueOnce(
        of({
          data: [
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
        }),
      )
      .mockReturnValueOnce(
        of({
          data: '<html><body>Offline play: Yes*<br>(*)Download required: No*</body></html>',
        }),
      );

    const result = await service.fetchGameData('Test');
    expect(result[0].has_physical_release).toBe(true);
    expect(result[0].has_game_on_disc).toBe(true);
  });

  it('returns empty array when no search results', async () => {
    mockGet.mockReturnValue(of({ data: [] }));
    const result = await service.fetchGameData('NoGameLikeThis');
    expect(result).toEqual([]);
  });
});
