import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { HowLongToBeatService } from '../howlongtobeat_parser/howlongtobeat_parser.service';
import { SearchGameResultDtoType } from '../search/search.dto';

@Injectable()
export class GamesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hltbParserService: HowLongToBeatService,
  ) {}

  async createGame(game: SearchGameResultDtoType) {
    const slug = this.hltbParserService.transformToHltbSlug(game.name);
    await this.prismaService.game.create({
      data: {
        hltbId: game.id,
        name: game.name,
        slug,
        platformForGame: {
          create: game.platforms
            ? game.platforms.map((platform) => ({
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
              }))
            : [
                {
                  platform: {
                    connectOrCreate: {
                      where: {
                        slug: 'brak-informacji',
                      },
                      create: {
                        name: 'Brak informacji',
                        slug: 'brak-informacji',
                      },
                    },
                  },
                },
              ],
        },
        genres: {
          create: game.genres
            ? game.genres.map((genre) => ({
                genre: {
                  connectOrCreate: {
                    where: {
                      slug: genre.slug,
                    },
                    create: {
                      name: genre.name,
                      slug: genre.slug,
                    },
                  },
                },
              }))
            : [
                {
                  genre: {
                    connectOrCreate: {
                      where: {
                        slug: 'brak-informacji',
                      },
                      create: {
                        name: 'Brak informacji',
                        slug: 'brak-informacji',
                      },
                    },
                  },
                },
              ],
        },
        cover: {
          create: {
            bigUrl: game.coverBigUrl,
            smallUrl: game.coverSmallUrl,
            mediumUrl: game.coverMediumUrl,
          },
        },
        release: {
          create: {
            date: game.firstReleaseDate,
          },
        },
      },
    });
  }

  async getGameById(hltbId: number) {
    return this.prismaService.game.findUnique({
      where: {
        hltbId,
      },
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
      },
    });
  }
}
