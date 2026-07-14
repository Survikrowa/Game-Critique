import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FetchDoesItPlayDataCommand } from './fetch_does_it_play_data.command';
import { DoesItPlayScraperService } from '../../../infrastructure/adapters/does-it-play-scraper.service';
import { PrismaService } from '../../../../database/prisma.service';

@CommandHandler(FetchDoesItPlayDataCommand)
export class FetchDoesItPlayDataHandler
  implements ICommandHandler<FetchDoesItPlayDataCommand>
{
  constructor(
    private readonly scraper: DoesItPlayScraperService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: FetchDoesItPlayDataCommand): Promise<boolean> {
    const game = await this.prisma.game.findUnique({
      where: { hltbId: command.hltbId },
    });
    if (!game) return false;

    const entries = await this.scraper.fetchGameData(game.name);
    if (entries.length === 0) return false;

    const metadata = await this.prisma.game_metadata.upsert({
      where: { game_id: game.id },
      create: { game_id: game.id },
      update: {},
    });

    await this.prisma.games_physical_media.deleteMany({
      where: { game_metadata_id: metadata.id },
    });

    await this.prisma.games_physical_media.createMany({
      data: entries.map((e) => ({
        game_metadata_id: metadata.id,
        platform: e.testedOn,
        has_physical_release: e.has_physical_release,
        has_game_on_disc: e.has_game_on_disc,
      })),
    });

    return true;
  }
}
