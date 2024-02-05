import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SearchGameResultDtoType } from '../search/search.dto';
import { GamesRepository } from './games.repository';
import { GameWithAllDataDTO } from './games.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectQueue('games') private gamesQueue: Queue,
    private readonly gamesRepository: GamesRepository,
  ) {}

  async addGamesToDatabase(games: SearchGameResultDtoType[]) {
    await this.gamesQueue.add('createGame', games);
  }

  async getGameById(hltbId: number): Promise<GameWithAllDataDTO> {
    const game = await this.gamesRepository.getGameById(hltbId);
    if (!game) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Nie znaleziono gry o podanym ID',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { cover, platformForGame, genres, release, ...baseGame } = game;

    return {
      ...baseGame,
      covers: cover,
      platforms: platformForGame.map(({ platform }) => platform),
      releases: release,
      genres: genres.map(({ genre }) => genre),
    };
  }
}
