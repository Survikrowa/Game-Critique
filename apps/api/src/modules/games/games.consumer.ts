import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GamesRepository } from './games.repository';
import { Prisma } from '@prisma/client';
import { SearchGameResultDtoType } from '../search/search.dto';

@Processor('games')
export class GamesConsumer {
  constructor(private readonly gamesRepository: GamesRepository) {}

  @Process('createGame')
  async createGame(job: Job<SearchGameResultDtoType[]>) {
    for (const game of job.data) {
      try {
        await this.gamesRepository.createGame(game);
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        ) {
          return;
        }
      }
    }
  }
}
