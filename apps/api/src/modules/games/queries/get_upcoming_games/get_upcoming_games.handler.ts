import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUpcomingGamesQuery } from './get_upcoming_games.query';
import { Inject } from '@nestjs/common';
import {
  GAMES_PROVIDER,
  IGamesProvider,
} from '../../interfaces/games-provider.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UpcomingGamesPreferencesFacade } from '../../services/upcoming-games-preferences.facade';
import { ExternalGameDTO } from '../../games.dto';

const CACHE_TTL_SECONDS = 3600;
const FETCH_LIMIT = 60;

@QueryHandler(GetUpcomingGamesQuery)
export class GetUpcomingGamesHandler
  implements IQueryHandler<GetUpcomingGamesQuery>
{
  constructor(
    @Inject(GAMES_PROVIDER) private readonly gamesProvider: IGamesProvider,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly preferencesFacade: UpcomingGamesPreferencesFacade,
  ) {}

  async execute({ limit, oauthId }: GetUpcomingGamesQuery) {
    const platformIds =
      await this.preferencesFacade.resolvePlatformIds(oauthId);
    const cacheKey = `upcoming_games_${limit}_${[...platformIds]
      .sort()
      .join(',')}`;
    const cachedData = await this.cacheManager.get<ExternalGameDTO[]>(cacheKey);
    if (cachedData) return cachedData;
    const games = await this.gamesProvider.getUpcomingGames(
      FETCH_LIMIT,
      platformIds,
    );
    const sliced = games.slice(0, limit);
    await this.cacheManager.set(cacheKey, sliced, CACHE_TTL_SECONDS);
    return sliced;
  }
}
