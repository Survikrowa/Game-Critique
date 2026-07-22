import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHLTBComparisonQuery } from './get_hltb_comparison.query';
import { PrismaService } from '../../../database/prisma.service';
import { HLTBComparisonDTO } from '../../user_stats.dto';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

@QueryHandler(GetHLTBComparisonQuery)
export class GetHLTBComparisonHandler
  implements IQueryHandler<GetHLTBComparisonQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetHLTBComparisonQuery): Promise<HLTBComparisonDTO> {
    const { gameStatusId, oauthId } = query;

    const gameStatus = await this.prisma.gamesStatus.findFirst({
      where: { id: gameStatusId, user: { oauthId } },
      include: {
        completedIn: true,
        game: { include: { completionTime: true } },
      },
    });

    if (!gameStatus || !gameStatus.completedIn) {
      return {
        myHours: null,
        myMinutes: null,
        mainStoryHours: null,
        completionistHours: null,
      };
    }

    const myHours = gameStatus.completedIn.hours || 0;
    const myMinutes = gameStatus.completedIn.minutes || 0;

    let mainStoryHours: number | null = null;
    let completionistHours: number | null = null;

    if (gameStatus.game.completionTime) {
      if (gameStatus.game.completionTime.main) {
        mainStoryHours =
          Math.round(
            (gameStatus.game.completionTime.main /
              (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) *
              10,
          ) / 10;
      }
      if (gameStatus.game.completionTime.completionist) {
        completionistHours =
          Math.round(
            (gameStatus.game.completionTime.completionist /
              (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) *
              10,
          ) / 10;
      }
    }

    return { myHours, myMinutes, mainStoryHours, completionistHours };
  }
}
