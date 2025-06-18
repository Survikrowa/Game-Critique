import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GamesRepository } from './games.repository';
import { SearchGameResultDtoType } from '../search/search.dto';

@Processor('games')
export class GamesConsumer {
  constructor(private readonly gamesRepository: GamesRepository) {}

  @Process('createGame')
  async createGame(job: Job<SearchGameResultDtoType[]>) {
    return Promise.allSettled(
      job.data.map((game) => this.gamesRepository.createGame(game)),
    );
  }
}
