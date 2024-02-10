import { Injectable } from '@nestjs/common';
import { GamesStatusRepository } from './games_status.repository';
import { CreateGameStatusArgsDTO } from './games_status.dto';

@Injectable()
export class GamesStatusService {
  constructor(private readonly gamesStatusRepository: GamesStatusRepository) {}

  async getAllUserGamesStatus(oauthId: string) {
    return this.gamesStatusRepository.getAllUserGamesStatus(oauthId);
  }

  async getUserGameStatusById(oauthId: string, gameStatusId: number) {
    return this.gamesStatusRepository.getUserGameStatusById(
      oauthId,
      gameStatusId,
    );
  }

  async userHasGameStatusWithPlatformId(
    oauthId: string,
    gameId: number,
    platformId: number,
  ) {
    return this.gamesStatusRepository.getGamesStatusByProfileAndGameData(
      oauthId,
      gameId,
      platformId,
    );
  }
  async createGameStatus(
    createGameStatusArgs: CreateGameStatusArgsDTO,
    oauthId: string,
  ) {
    return this.gamesStatusRepository.createGameStatus(
      createGameStatusArgs,
      oauthId,
    );
  }
}
