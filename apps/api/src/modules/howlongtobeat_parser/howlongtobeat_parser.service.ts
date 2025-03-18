import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import UserAgent from 'user-agents';
import { firstValueFrom } from 'rxjs';
import {
  GameData,
  HowLongToBeatSearchResponse,
} from './howlongtobeat_parser.types';
import axios, { AxiosResponse } from 'axios';
import { HowLongToBeatScrapperService } from './howlongtobeat_scrapper/howlongtobeat_scrapper.service';
import { HowLongToBeatSearchUrl } from './howlongtobeat_search_url/howlongtobeat_search_url';

export type Platform = {
  name: string;
  slug: string;
};

export type Genre = {
  name: string;
  slug: string;
};

type Covers = {
  coverBigUrl: string;
  coverSmallUrl: string;
  coverMediumUrl: string;
};

export type SearchResult = {
  platforms: Platform[];
  slug: string;
  genres: Genre[];
} & Covers &
  GameData;

interface HowLongToBeatServiceFields {
  mapSearchResult: (
    serachResult: HowLongToBeatSearchResponse['data'],
  ) => Promise<SearchResult[]>;
  search: (title: string) => Promise<{ hltbSearchResult: SearchResult[] }>;
}

const MAX_RETRIES = 3;

@Injectable()
export class HowLongToBeatService implements HowLongToBeatServiceFields {
  constructor(
    private readonly httpService: HttpService,
    private readonly hltbScrapper: HowLongToBeatScrapperService,
  ) {}
  private readonly logger = new Logger('HLTB Search Service');
  private readonly howLongToBeatSearchUrl = new HowLongToBeatSearchUrl();
  private retries = 0;
  async search(title: string): Promise<{ hltbSearchResult: SearchResult[] }> {
    const searchTerms = title.split(' ');
    const hltbSearchPayload = getDefaultHltbSearchPayload(searchTerms);
    try {
      this.retries += 1;
      this.logger.log('Starting search');
      const {
        data: { data },
      } = await this.fetchSearchResult(hltbSearchPayload);

      const searchResult = await this.mapSearchResult(data);
      this.retries = 0;
      return { hltbSearchResult: searchResult };
    } catch (e: unknown) {
      if (
        axios.isAxiosError(e) &&
        e.response?.status === HttpStatus.NOT_FOUND &&
        this.retries <= MAX_RETRIES
      ) {
        this.logger.debug('Updating search hash');
        await this.howLongToBeatSearchUrl.updateSearchHash();
        this.logger.debug('Updated search hash');

        return this.search(title);
      }
      this.logger.error('Something went terribly wrong');
      return { hltbSearchResult: [] };
    }
  }

  async fetchSearchResult(
    hltbSearchPayload: HowLongToBeatDefaultSearchPayload,
  ) {
    const { data, status } = await firstValueFrom<
      AxiosResponse<HowLongToBeatSearchResponse>
    >(
      this.httpService.post(
        `/api/ouch/${this.howLongToBeatSearchUrl.searchHash}`,
        {
          ...hltbSearchPayload,
        },
        {
          headers: {
            'User-Agent': new UserAgent().toString(),
            origin: 'https://howlongtobeat.com',
            referer: 'https://howlongtobeat.com',
          },
          timeout: 20000,
        },
      ),
    );
    return { data, status };
  }

  async mapSearchResult(searchResult: HowLongToBeatSearchResponse['data']) {
    return Promise.all(
      searchResult.map(async (game) => {
        const gamePage = await this.hltbScrapper.getHTMLGamePage(game.game_id);
        const { genres, platforms } = await this.hltbScrapper.parseHTMlGamePage(
          gamePage.html,
        );
        return {
          ...game,
          slug: this.transformToHltbSlug(game.game_name),
          ...this.getCoverUrls(game.game_image),
          platforms: this.getPlatforms(platforms),
          genres: this.getGenres(genres),
        };
      }),
    );
  }

  getCoverUrls(gameImage: string) {
    return {
      coverBigUrl: `https://howlongtobeat.com/games/${gameImage}?width=760`,
      coverSmallUrl: `https://howlongtobeat.com/games/${gameImage}?width=100`,
      coverMediumUrl: `https://howlongtobeat.com/games/${gameImage}?width=250`,
    };
  }

  transformToHltbSlug(str: string) {
    return str.toLowerCase().split(' ').join('-');
  }

  getPlatforms(profilePlatform: string[]) {
    return profilePlatform.map((platform) => ({
      name: platform,
      slug: this.transformToHltbSlug(platform),
    }));
  }

  getGenres(genres: string[]) {
    return genres.map((genre) => ({
      name: genre,
      slug: this.transformToHltbSlug(genre.trim()),
    }));
  }
}

const getDefaultHltbSearchPayload = (searchTerms: string[]) => ({
  searchType: 'games',
  searchTerms: [...searchTerms],
  searchPage: 1,
  size: 20,
  searchOptions: {
    games: {
      userId: 0,
      platform: '',
      sortCategory: 'popular',
      rangeCategory: 'main',
      rangeTime: {
        min: null,
        max: null,
      },
      gameplay: {
        perspective: '',
        flow: '',
        genre: '',
        difficulty: '',
      },
      rangeYear: {
        min: '',
        max: '',
      },
      modifier: '',
    },
    users: {
      sortCategory: 'postcount',
    },
    lists: {
      sortCategory: 'follows',
    },
    filter: '',
    sort: 0,
    randomizer: 0,
  },
  useCache: true,
});

type HowLongToBeatDefaultSearchPayload = ReturnType<
  typeof getDefaultHltbSearchPayload
>;
