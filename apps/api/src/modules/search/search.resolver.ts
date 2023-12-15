import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchResult } from './search.model';
import { SearchService } from './search.service';
import { GamesService } from '../games/games.service';

@Resolver(() => SearchResult)
export class SearchResolver {
  constructor(
    private readonly searchService: SearchService,
    private readonly gamesService: GamesService,
  ) {}

  @Query(() => SearchResult)
  async search(@Args('input') input: string) {
    const games = await this.searchService.search(input);
    await this.gamesService.addGamesToDatabase(games);
    return { games };
  }
}
