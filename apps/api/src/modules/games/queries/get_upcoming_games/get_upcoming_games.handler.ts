import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUpcomingGamesQuery } from './get_upcoming_games.query';
import { Inject } from '@nestjs/common';
import {
  GAMES_PROVIDER,
  IGamesProvider,
} from '../../interfaces/games-provider.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

const CACHE_TTL_SECONDS = 3600; // 1 hour

@QueryHandler(GetUpcomingGamesQuery)
export class GetUpcomingGamesHandler
  implements IQueryHandler<GetUpcomingGamesQuery>
{
  constructor(
    @Inject(GAMES_PROVIDER) private readonly gamesProvider: IGamesProvider,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute({ limit }: GetUpcomingGamesQuery) {
    const cacheKey = `upcoming_games_${limit}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const games = await this.gamesProvider.getUpcomingGames(limit);
    await this.cacheManager.set(cacheKey, games, CACHE_TTL_SECONDS);
    return games;
  }
}
