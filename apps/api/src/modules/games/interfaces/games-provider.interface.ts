import { ExternalGameDTO } from '../games.dto';

export interface IGamesProvider {
  getUpcomingGames(
    limit: number,
    platformIds: number[],
  ): Promise<ExternalGameDTO[]>;
}

export const GAMES_PROVIDER = 'GAMES_PROVIDER';
