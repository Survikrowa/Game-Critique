import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import UserAgent from 'user-agents';
import { firstValueFrom } from 'rxjs';
import { HowLongToBeatSearchResponse } from './howlongtobeat_parser.types';
import { AxiosResponse } from 'axios';
import { HowLongToBeatScrapperService } from './howlongtobeat_scrapper/howlongtobeat_scrapper.service';

@Injectable()
export class HowLongToBeatService {
  constructor(
    private readonly httpService: HttpService,
    private readonly hltbScrapper: HowLongToBeatScrapperService,
  ) {}

  async search(title: string) {
    const searchTerms = title.split(' ');
    const hltbSearchPayload = getDefaultHltbSearchPayload(searchTerms);
    const { data } = await firstValueFrom<
      AxiosResponse<HowLongToBeatSearchResponse>
    >(
      this.httpService.post(
        '/api/search',
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
    const searchResult = await Promise.all(
      data.data.map(async (game) => {
        const gamePage = await this.hltbScrapper.getHTMLGamePage(game.game_id);
        const { genres } = await this.hltbScrapper.parseHTMlGamePage(
          gamePage.html,
        );
        return {
          ...game,
          slug: this.transformToHltbSlug(game.game_name),
          ...this.getCoverUrls(game.game_image),
          platforms: this.getPlatforms(game.profile_platform),
          genres: this.getGenres(genres),
        };
      }),
    );
    return { hltbSearchResult: searchResult };
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

  getPlatforms(profilePlatform: string) {
    return profilePlatform.split(', ').map((platform) => ({
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

  async detail(id: string) {
    return {};
  }
}

const getDefaultHltbSearchPayload = (searchTerms: string[]) => ({
  searchType: 'games',
  searchTerms: [...searchTerms],
  searchPage: 1,
  size: 5,
  searchOptions: {
    games: {
      userId: 0,
      platform: '',
      sortCategory: 'popular',
      rangeCategory: 'main',
      rangeTime: {
        min: 0,
        max: 0,
      },
      gameplay: {
        perspective: '',
        flow: '',
        genre: '',
      },
      modifier: '',
    },
    users: {
      sortCategory: 'postcount',
    },
    filter: '',
    sort: 0,
    randomizer: 0,
  },
});
