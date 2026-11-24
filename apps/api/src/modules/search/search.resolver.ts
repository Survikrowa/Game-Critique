import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchResult } from './search.model';
import { SearchService } from './search.service';

@Resolver(() => SearchResult)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => SearchResult)
  async search(@Args('input') input: string) {
    const games = await this.searchService.search(input);
    return {
      games: games.map((game) => ({
        id: game.id,
        name: game.name,
        cover: {
          small_url: game.cover?.smallUrl ?? '',
        },
      })),
    };
  }
}
