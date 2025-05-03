import { Query } from '@nestjs/cqrs';

export class FetchGamesFromHltbQuery extends Query<FetchGamesFromHltbQueryReturn> {
  constructor(public readonly input: string) {
    super();
  }
}

type FetchGamesFromHltbQueryReturn = HltbSearchResult[];

type HltbSearchResult = {
  id: number;
  name: string;
  coverBigUrl: string;
  coverSmallUrl: string;
  coverMediumUrl: string;
  firstReleaseDate: number;
  platforms: Platform[];
  genres: Genre[];
  completionTime: {
    mainStory: number;
    mainExtra: number;
    completionist: number;
  };
};

type Platform = {
  name: string;
  slug: string;
};

type Genre = {
  name: string;
  slug: string;
};
