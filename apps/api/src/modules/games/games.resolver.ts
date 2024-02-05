import { Args, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { GameWithAllDataDTO } from './games.dto';

@Resolver()
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Query(() => GameWithAllDataDTO, { name: 'game' })
  async getGameById(@Args('hltbId') hltbId: number) {
    return this.gamesService.getGameById(hltbId);
  }
}
