import { Resolver, Query, Args } from '@nestjs/graphql';
import { DoesItPlaySearchResult } from './doesitplay_scraper.model';
import { DoesItPlayService } from './doesitplay_scraper.service';

@Resolver(() => DoesItPlaySearchResult)
export class DoesItPlayResolver {
  constructor(private readonly doesItPlayService: DoesItPlayService) {}

  @Query(() => DoesItPlaySearchResult)
  async searchDoesItPlay(@Args('gameName') gameName: string) {
    const games = await this.doesItPlayService.searchGameFromApi(gameName);
    return {
      games,
    };
  }
}
