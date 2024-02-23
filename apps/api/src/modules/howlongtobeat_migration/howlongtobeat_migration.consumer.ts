import { Process, Processor } from '@nestjs/bull';
import { GamesService } from '../games/games.service';
import { SearchService } from '../search/search.service';
import { MigrateJobData } from './howlongtobeat_migration.dto';
import { HowLongToBeatMigrationService } from './howlongtobeat_migration.service';
import { Job } from 'bull';
import { PrismaService } from '../database/prisma.service';
import { GamesStatusService } from '../games_status/games_status.service';
import { HowLongToBeatMigrationStatusService } from './howlongtobeat_migration_status/howlongtobeat_migration_status.service';

@Processor('hltbMigration')
export class HowLongToBeatMigrationConsumer {
  constructor(
    private readonly gamesService: GamesService,
    private readonly searchService: SearchService,
    private readonly howLongToBeatMigrationService: HowLongToBeatMigrationService,
    private readonly prismaService: PrismaService,
    private readonly gamesStatusService: GamesStatusService,
    private readonly howLongToBeatMigrationStatusService: HowLongToBeatMigrationStatusService,
  ) {}
  @Process('migrate')
  async migrate({ data }: Job<MigrateJobData>) {
    try {
      const gamesTitles = this.howLongToBeatMigrationService.getGamesTitles(
        data.games,
      );

      const searchResults = await Promise.all(
        gamesTitles.map(
          async (title) => await this.searchService.search(title),
        ),
      );

      const job = await this.gamesService.addGamesToDatabase(
        searchResults.flat(),
      );
      await job.isCompleted();
      for (const gameData of data.games) {
        await this.prismaService.$transaction(async () => {
          const game = await this.gamesService.findGameByName(gameData.title);
          if (game) {
            const platform = game.platformForGame.flatMap((platform) => {
              if (platform.platform.name === gameData.platform) {
                return platform.platform;
              }
              return [];
            });
            if (!gameData.backlog) {
              await this.gamesStatusService.upsertGameStatus(
                {
                  gameId: game.id,
                  gameStatus:
                    this.howLongToBeatMigrationService.parseGameStatus({
                      completed: gameData.completed,
                      playing: gameData.playing,
                      replay: gameData.replay,
                      retired: gameData.retired,
                      backlog: gameData.backlog,
                    }),
                  platformId: platform[0].id,
                  isEditing: false,
                  achievementsCompleted: false,
                  score: gameData.completed
                    ? this.howLongToBeatMigrationService.parseGameScore(
                        gameData.review,
                      )
                    : '',
                  completedIn:
                    this.howLongToBeatMigrationService.parseGameCompletionTime({
                      completionist: gameData.completionist,
                      'main+extra': gameData['main+extras'],
                      mainstory: gameData['mainstory'],
                    }),
                  review: gameData.reviewnotes,
                },
                data.oauthId,
              );
            }
          }
        });
      }
      await this.howLongToBeatMigrationStatusService.upsertMigrationStatus(
        data.oauthId,
        'FINISHED',
      );
    } catch (e) {
      await this.howLongToBeatMigrationStatusService.upsertMigrationStatus(
        data.oauthId,
        'FAILED',
      );
    }
  }
}
