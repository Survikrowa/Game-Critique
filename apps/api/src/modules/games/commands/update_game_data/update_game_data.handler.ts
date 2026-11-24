import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GameDataSource } from '@prisma/client';
import { UpdateGameDataCommand } from './update_game_data.command';
import { PrismaService } from '../../../database/prisma.service';
import { GamesRepository } from '../../games.repository';
import {
  GAME_PROVIDER_REGISTRY,
  GameProviderRegistry,
} from '../../domain/ports/game_provider.port';

const EMPTY_TIME = 0;
const UNKNOWN_TAXONOMY = {
  sourceId: null,
  name: 'Brak informacji',
  slug: 'brak-informacji',
};

@CommandHandler(UpdateGameDataCommand)
export class UpdateGameDataHandler
  implements ICommandHandler<UpdateGameDataCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gamesRepository: GamesRepository,
    @Inject(GAME_PROVIDER_REGISTRY)
    private readonly registry: GameProviderRegistry,
  ) {}

  async execute(command: UpdateGameDataCommand) {
    const game = await this.gamesRepository.getGameById(command.gameId);
    if (!game) return null;

    const igdbSource = game.sourceIds.find(
      (source) => source.source === GameDataSource.IGDB,
    );
    const details = await this.registry.primary.getGameDetails({
      source: GameDataSource.IGDB,
      externalId: igdbSource?.externalId ?? null,
      name: game.name,
    });
    if (!details) return null;

    const platforms =
      details.platforms.length > 0 ? details.platforms : [UNKNOWN_TAXONOMY];
    const genres =
      details.genres.length > 0 ? details.genres : [UNKNOWN_TAXONOMY];
    const completionTime = {
      main: details.completionTime.main ?? EMPTY_TIME,
      mainExtra: details.completionTime.mainExtra ?? EMPTY_TIME,
      completionist: details.completionTime.completionist ?? EMPTY_TIME,
    };

    await this.prismaService.$transaction(async (tx) => {
      await tx.game.update({
        where: { id: game.id },
        data: {
          completionTime: {
            upsert: {
              create: completionTime,
              update: completionTime,
            },
          },
          platformForGame: {
            deleteMany: {},
            create: platforms.map((platform) => ({
              platform: {
                connectOrCreate: {
                  where: { slug: platform.slug },
                  create: { name: platform.name, slug: platform.slug },
                },
              },
            })),
          },
          genres: {
            deleteMany: {},
            create: genres.map((genre) => ({
              genre: {
                connectOrCreate: {
                  where: { slug: genre.slug },
                  create: { name: genre.name, slug: genre.slug },
                },
              },
            })),
          },
        },
      });
    });

    return {
      gameId: game.id,
    };
  }
}
