import { Inject, Injectable } from '@nestjs/common';
import { GameDataSource, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import {
  ExternalGame,
  ExternalTaxonomy,
  PersistedGameSummary,
} from './domain/models/external_game.model';
import {
  GAME_SOURCE_REPOSITORY,
  GameSourceRepositoryPort,
} from './domain/ports/game_source.repository.port';

const UNKNOWN_TAXONOMY: ExternalTaxonomy = {
  sourceId: null,
  name: 'Brak informacji',
  slug: 'brak-informacji',
};

const EMPTY_TIME = 0;

@Injectable()
export class GamesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(GAME_SOURCE_REPOSITORY)
    private readonly gameSourceRepository: GameSourceRepositoryPort,
  ) {}

  async upsertExternalGame(game: ExternalGame): Promise<PersistedGameSummary> {
    const existingGameId = await this.gameSourceRepository.findGameId(
      game.source,
      game.externalId,
    );

    if (existingGameId) {
      await this.prismaService.game.update({
        where: { id: existingGameId },
        data: this.toUpdateData(game),
      });
      return {
        id: existingGameId,
        name: game.name,
        cover: game.cover,
      };
    }

    const legacyGame = await this.findLegacyGame(game);
    if (legacyGame) {
      await this.prismaService.$transaction(async (tx) => {
        await tx.game.update({
          where: { id: legacyGame.id },
          data: this.toUpdateData(game),
        });
        await tx.gameSourceId.create({
          data: {
            gameId: legacyGame.id,
            source: game.source,
            externalId: game.externalId,
          },
        });
      });
      return {
        id: legacyGame.id,
        name: game.name,
        cover: game.cover,
      };
    }

    const created = await this.prismaService.$transaction(async (tx) => {
      const newGame = await tx.game.create({
        data: this.toCreateData(game),
      });
      await tx.gameSourceId.create({
        data: {
          gameId: newGame.id,
          source: game.source,
          externalId: game.externalId,
        },
      });
      return newGame;
    });

    return {
      id: created.id,
      name: created.name,
      cover: game.cover,
    };
  }

  async getGameById(gameId: number) {
    return this.prismaService.game.findUnique({
      where: { id: gameId },
      include: {
        cover: true,
        platformForGame: {
          include: {
            platform: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
        release: true,
        completionTime: true,
        game_metadata: {
          include: {
            games_physical_media: true,
          },
        },
        gameRating: true,
        sourceIds: true,
      },
    });
  }

  async getGameByName(name: string) {
    return this.prismaService.game.findFirst({
      where: {
        name,
      },
      include: {
        platformForGame: {
          include: {
            platform: true,
          },
        },
        sourceIds: true,
      },
    });
  }

  private findLegacyGame = async (game: ExternalGame) => {
    return this.prismaService.game.findFirst({
      where: {
        name: { equals: game.name, mode: 'insensitive' },
        sourceIds: {
          some: { source: GameDataSource.HLTB },
          none: { source: game.source },
        },
      },
      select: { id: true },
      orderBy: { id: 'asc' },
    });
  };

  private toCreateData(game: ExternalGame): Prisma.GameCreateInput {
    return {
      name: game.name,
      slug: game.slug,
      completionTime: {
        create: {
          main: game.completionTime.main ?? EMPTY_TIME,
          mainExtra: game.completionTime.mainExtra ?? EMPTY_TIME,
          completionist: game.completionTime.completionist ?? EMPTY_TIME,
        },
      },
      platformForGame: {
        create: this.resolvableTaxonomy(game.platforms).map((platform) => ({
          platform: {
            connectOrCreate: {
              where: { slug: platform.slug },
              create: { name: platform.name, slug: platform.slug },
            },
          },
        })),
      },
      genres: {
        create: this.resolvableTaxonomy(game.genres).map((genre) => ({
          genre: {
            connectOrCreate: {
              where: { slug: genre.slug },
              create: { name: genre.name, slug: genre.slug },
            },
          },
        })),
      },
      cover: {
        create: this.coverData(game),
      },
      release: {
        create: {
          date: game.releaseYear,
        },
      },
    };
  }

  private toUpdateData(game: ExternalGame): Prisma.GameUpdateInput {
    return {
      name: game.name,
      slug: game.slug,
      completionTime: {
        upsert: {
          create: {
            main: game.completionTime.main ?? EMPTY_TIME,
            mainExtra: game.completionTime.mainExtra ?? EMPTY_TIME,
            completionist: game.completionTime.completionist ?? EMPTY_TIME,
          },
          update: {
            main: game.completionTime.main ?? EMPTY_TIME,
            mainExtra: game.completionTime.mainExtra ?? EMPTY_TIME,
            completionist: game.completionTime.completionist ?? EMPTY_TIME,
          },
        },
      },
      platformForGame: {
        deleteMany: {},
        create: this.resolvableTaxonomy(game.platforms).map((platform) => ({
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
        create: this.resolvableTaxonomy(game.genres).map((genre) => ({
          genre: {
            connectOrCreate: {
              where: { slug: genre.slug },
              create: { name: genre.name, slug: genre.slug },
            },
          },
        })),
      },
      cover: {
        upsert: {
          create: this.coverData(game),
          update: this.coverData(game),
        },
      },
      release: {
        upsert: {
          create: { date: game.releaseYear },
          update: { date: game.releaseYear },
        },
      },
    };
  }

  private coverData(game: ExternalGame) {
    return {
      smallUrl: game.cover?.smallUrl ?? '',
      mediumUrl: game.cover?.mediumUrl ?? '',
      bigUrl: game.cover?.bigUrl ?? '',
    };
  }

  private resolvableTaxonomy(items: ExternalTaxonomy[]): ExternalTaxonomy[] {
    const unique = new Map(items.map((item) => [item.slug, item]));
    return unique.size > 0 ? [...unique.values()] : [UNKNOWN_TAXONOMY];
  }
}
