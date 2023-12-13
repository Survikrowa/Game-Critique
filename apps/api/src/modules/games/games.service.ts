import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IGDBGamesDto } from '../igdb/dtos/igdb_games.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addGameToDatabase(game: IGDBGamesDto[number]) {
    console.log(game);
    await this.prismaService.game.create({
      data: {
        igdbId: game.id,
        name: game.name,
        slug: game.slug,
        platformForGame: {
          create: game.platforms
            ? game.platforms.map((platform) => ({
                platform: {
                  connectOrCreate: {
                    where: {
                      igdbId: platform.id,
                    },
                    create: {
                      igdbId: platform.id,
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
                        igdbId: 999999,
                      },
                      create: {
                        igdbId: 999999,
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
                      igdbId: genre.id,
                    },
                    create: {
                      igdbId: genre.id,
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
                        igdbId: 999999,
                      },
                      create: {
                        igdbId: 999999,
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
            igdbId: game.cover.id,
            url: game.cover.url,
          },
        },
        release: {
          create: {
            date: game.first_release_date,
          },
        },
      },
    });
  }
}
