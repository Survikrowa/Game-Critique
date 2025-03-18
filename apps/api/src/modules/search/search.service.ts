import { Injectable } from '@nestjs/common';
import { SearchGameResultDtoType } from './search.dto';
import { QueryBus } from '@nestjs/cqrs';
import { FetchGamesFromHltbQuery } from './queries/fetch_games_from_hltb.query';

@Injectable()
export class SearchService {
  constructor(private readonly queryBus: QueryBus) {}

  async search(input: string): Promise<SearchGameResultDtoType[]> {
    try {
      return this.queryBus.execute(new FetchGamesFromHltbQuery(input));
    } catch (error) {
      return [];
    }
  }
}
