import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { GetUpcomingGamesQuery } from './get_upcoming_games.query';
import { UpcomingGamesPreferencesFacade } from '../../services/upcoming-games-preferences.facade';
import { ExternalGameDTO } from '../../games.dto';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../../domain/ports/game_provider.port';
import { toExternalGameDto } from '../../infrastructure/mappers/external_game_to_dto';

const CACHE_TTL_SECONDS = 3600;
const FETCH_LIMIT = 60;

@QueryHandler(GetUpcomingGamesQuery)
export class GetUpcomingGamesHandler
  implements IQueryHandler<GetUpcomingGamesQuery>
{
  constructor(
    @Inject(GAME_PROVIDER_REGISTRY)
    private readonly registry: GameProviderRegistry,
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

    const games = await this.registry.primary.getUpcomingGames({
      limit: FETCH_LIMIT,
      platformIds,
    });
    const sliced = games.slice(0, limit).map(toExternalGameDto);
    await this.cacheManager.set(cacheKey, sliced, CACHE_TTL_SECONDS);
    return sliced;
  }
}
