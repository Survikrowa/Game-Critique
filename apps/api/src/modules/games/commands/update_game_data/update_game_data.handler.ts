import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGameDataCommand } from './update_game_data.command';
import { PrismaService } from '../../../database/prisma.service';
import { HowLongToBeatParserFacade } from '../../../howlongtobeat_parser/howlongtobeat_parser.facade';

@CommandHandler(UpdateGameDataCommand)
export class UpdateGameDataHandler
  implements ICommandHandler<UpdateGameDataCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hltbScrapper: HowLongToBeatParserFacade,
  ) {}

  async execute(command: UpdateGameDataCommand) {
    const gameDetails = await this.hltbScrapper.fetchGameDetails(
      command.hltbId,
    );

    const existingGame = await this.prismaService.game.findUnique({
      where: { hltbId: command.hltbId },
      include: { platformForGame: true },
    });

    const existingPlatformSlugs =
      existingGame?.platformForGame.map((platform) => platform.platformSlug) ||
      [];

    const newPlatforms = gameDetails.platforms.filter(
      (platform) => !existingPlatformSlugs.includes(platform.slug),
    );

    const updatedGame = await this.prismaService.game.update({
      where: {
        hltbId: command.hltbId,
      },
      data: {
        platformForGame: {
          connectOrCreate: newPlatforms.map((platform) => ({
            where: {
              gameId_platformSlug: {
                gameId: command.hltbId,
                platformSlug: platform.slug,
              },
            },
            create: {
              platform: {
                connectOrCreate: {
                  where: {
                    slug: platform.slug,
                  },
                  create: {
                    name: platform.name,
                    slug: platform.slug,
                  },
                },
              },
            },
          })),
        },
      },
    });
    return {
      hltbId: updatedGame.hltbId,
    };
  }
}
