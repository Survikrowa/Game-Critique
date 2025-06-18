import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SearchGameResultDtoType } from '../search/search.dto';
import { GamesRepository } from './games.repository';
import { GameWithAllDataDTO } from './games.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetGamesQuery } from './queries/get_games/get_games.query';
import { UpdateGameDataCommand } from './commands/update_game_data/update_game_data.command';

@Injectable()
export class GamesService {
  constructor(
    @InjectQueue('games') private gamesQueue: Queue,
    private readonly gamesRepository: GamesRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async addGamesToDatabase(games: SearchGameResultDtoType[]) {
    return this.gamesQueue.add('createGame', games);
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

    const {
      cover,
      platformForGame,
      genres,
      release,
      completionTime,
      ...baseGame
    } = game;

    return {
      ...baseGame,
      cover: cover,
      platforms: platformForGame.map(({ platform }) => platform),
      releases: release,
      genres: genres.map(({ genre }) => genre),
      completionTime,
    };
  }

  async getPaginatedGames({
    skip,
    take,
    search,
  }: GetPaginatedGamesArgs): Promise<GetPaginatedGamesResponse> {
    const games = await this.queryBus.execute(
      new GetGamesQuery(search, take, skip),
    );

    return {
      items: games,
      pagination: {
        skip: skip ?? 0,
        take: take ?? 10,
        total: games.length,
        hasMore: games.length === (take ?? 10),
        hasPrevious: (skip && skip > 0) || false,
        //ADD INFO ABOUT TOTAL COUNT OF GAMES IN DATABASE / TAKE
      },
    };
  }

  async findGameByName(name: string) {
    return this.gamesRepository.getGameByName(name);
  }

  async updateGameData(hltbId: number): Promise<UpdateGameDataResponse> {
    const gameDetails = await this.commandBus.execute(
      new UpdateGameDataCommand(hltbId),
    );

    if (!gameDetails) {
      return {
        hltbId,
        message: 'Could not update game data.',
      };
    }
    return {
      hltbId: gameDetails.hltbId,
      message: `Game data for HLTB ID ${gameDetails.hltbId} has been successfully updated.`,
    };
  }
}

type UpdateGameDataResponse = {
  hltbId: number;
  message: string;
};

type GetPaginatedGamesArgs = {
  search: string | null;
  take: number | undefined;
  skip: number | undefined;
};

type Game = {
  id: number;
  name: string;
  slug: string;
  hltbId: number;
};

type GetPaginatedGamesResponse = {
  items: Game[];
  pagination: {
    skip: number;
    take: number;
    total: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
};
