import { Injectable } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { GamesService } from '../games/games.service';
import { PersistedGameSummary } from '../games/domain/models/external_game.model';

@Injectable()
export class SearchService {
  constructor(private readonly gamesService: GamesService) {}

  search = async (input: string): Promise<PersistedGameSummary[]> =>
    this.gamesService.searchGames(input);

  searchForImport = async (input: string): Promise<PersistedGameSummary[]> => {
    const games = await this.gamesService.searchGamesWithSource(
      GameDataSource.HLTB,
      input,
    );
    return this.gamesService.upsertExternalGames(games);
  };
}
