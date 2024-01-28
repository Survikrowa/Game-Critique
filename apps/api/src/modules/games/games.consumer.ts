import { Process, Processor } from '@nestjs/bull';
import { IGDBGamesDto } from '../igdb/dtos/igdb_games.dto';
import { Job } from 'bull';
import { GamesRepository } from './games.repository';
import { Prisma } from '@prisma/client';
import { SearchGamesResult } from '../search/search.model';
import { SearchGameResultDtoType } from '../search/search.dto';

@Processor('games')
export class GamesConsumer {
  constructor(private readonly gamesRepository: GamesRepository) {}

  @Process('createGame')
  async createGame(job: Job<SearchGameResultDtoType[]>) {
    job.data.map(async (game) => {
      try {
        await this.gamesRepository.createGame(game);
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2002'
        ) {
          return;
        }
        //TODO: Report to sentry otherwise
      }
    });
  }
}
