import { GameDataSource } from '@prisma/client';
import { HltbGameProvider } from './hltb-game.provider';
import { HowLongToBeatParserFacade } from '../../../howlongtobeat_parser/howlongtobeat_parser.facade';

const facade = {
  fetchGames: jest.fn(),
} as unknown as HowLongToBeatParserFacade;

describe('HltbGameProvider', () => {
  beforeEach(() => jest.clearAllMocks());

  it('maps HLTB search result to neutral ExternalGame', async () => {
    (facade.fetchGames as jest.Mock).mockResolvedValue([
      {
        id: 1022,
        name: 'The Witcher 3: Wild Hunt',
        coverSmallUrl: 'small',
        coverMediumUrl: 'medium',
        coverBigUrl: 'big',
        firstReleaseDate: 2015,
        platforms: [{ name: 'PC', slug: 'pc' }],
        genres: [{ name: 'Role-Playing', slug: 'role-playing' }],
        completionTime: {
          mainStory: 90000,
          mainExtra: 120000,
          completionist: 180000,
        },
      },
    ]);

    const provider = new HltbGameProvider(facade);
    const [game] = await provider.searchGames({ query: 'witcher', limit: 20 });

    expect(game.source).toBe(GameDataSource.HLTB);
    expect(game.externalId).toBe('1022');
    expect(game.releaseYear).toBe(2015);
    expect(game.kind).toBe('base');
    expect(game.completionTime.main).toBe(90000);
    expect(game.platforms[0].slug).toBe('pc');
  });

  it('returns completion times matched by external id', async () => {
    (facade.fetchGames as jest.Mock).mockResolvedValue([
      {
        id: 7,
        name: 'Other',
        coverSmallUrl: '',
        coverMediumUrl: '',
        coverBigUrl: '',
        firstReleaseDate: 2000,
        platforms: [],
        genres: [],
        completionTime: {
          mainStory: 1,
          mainExtra: null,
          completionist: null,
        },
      },
      {
        id: 1022,
        name: 'The Witcher 3',
        coverSmallUrl: '',
        coverMediumUrl: '',
        coverBigUrl: '',
        firstReleaseDate: 2015,
        platforms: [],
        genres: [],
        completionTime: {
          mainStory: 90000,
          mainExtra: 120000,
          completionist: 180000,
        },
      },
    ]);

    const provider = new HltbGameProvider(facade);
    const times = await provider.getCompletionTimes({
      source: GameDataSource.HLTB,
      externalId: '1022',
      name: 'The Witcher 3',
    });

    expect(times).toEqual({
      main: 90000,
      mainExtra: 120000,
      completionist: 180000,
    });
  });
});
