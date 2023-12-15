import { Injectable } from '@nestjs/common';
import { IGDBGamesDto } from '../igdb/dtos/igdb_games.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class GamesService {
  constructor(@InjectQueue('games') private gamesQueue: Queue) {}

  async addGamesToDatabase(games: IGDBGamesDto) {
    await this.gamesQueue.add('createGame', games);
  }
}
