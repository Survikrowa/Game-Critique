import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SearchGameResultDtoType } from '../search/search.dto';

@Injectable()
export class GamesService {
  constructor(@InjectQueue('games') private gamesQueue: Queue) {}

  async addGamesToDatabase(games: SearchGameResultDtoType[]) {
    await this.gamesQueue.add('createGame', games);
  }
}
