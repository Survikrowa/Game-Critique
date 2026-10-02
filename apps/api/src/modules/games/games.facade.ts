import { Injectable } from '@nestjs/common';
import { GamesService } from './games.service';

@Injectable()
export class GamesFacade {
  constructor(private readonly gamesService: GamesService) {}

  async getGameIdByHltbId(hltbId: number): Promise<number> {
    const game = await this.gamesService.getGameById(hltbId);
    return game.id;
  }
}
