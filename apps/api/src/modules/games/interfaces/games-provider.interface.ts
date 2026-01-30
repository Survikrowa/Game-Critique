import { ExternalGameDTO } from '../games.dto';

export interface IGamesProvider {
  getUpcomingGames(limit: number): Promise<ExternalGameDTO[]>;
}

export const GAMES_PROVIDER = 'GAMES_PROVIDER';
