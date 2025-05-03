import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SearchGameResultDtoType } from '../search/search.dto';
import { HowLongToBeatParserFacade } from '../howlongtobeat_parser/howlongtobeat_parser.facade';

@Injectable()
export class GamesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hltbParserFacade: HowLongToBeatParserFacade,
  ) {}

  async createGame(game: SearchGameResultDtoType) {
    const slug = this.hltbParserFacade.toHltbSearchUrl(game.name);
    await this.prismaService.game.create({
      data: {
        completionTime: {
          create: {
            main: game.completionTime.mainStory || 0,
            mainExtra: game.completionTime.mainExtra || 0,
            completionist: game.completionTime.completionist || 0,
          },
        },
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
        completionTime: true,
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
      },
    });
  }
}
