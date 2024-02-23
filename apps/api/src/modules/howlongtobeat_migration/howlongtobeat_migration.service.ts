import {
  HowLongToBeatAccountCsvGames,
  HowLongToBeatAccountCsvGamesSchema,
  MigrateJobData,
} from './howlongtobeat_migration.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GameStatus } from '@prisma/client';

export class HowLongToBeatMigrationService {
  constructor(
    @InjectQueue('hltbMigration')
    private hltbMigrationQueue: Queue<MigrateJobData>,
  ) {}
  parseCsvFile(file: Express.Multer.File) {
    const csv = file.buffer.toString('utf-8');
    const [header, ...rows] = csv.split('\n');
    const keys = header
      .split(',')
      .map((key) => key.toLowerCase().replaceAll('"', '').replaceAll(' ', ''));
    const mappedRows = rows
      .map((key) => key.trim().replaceAll('"', ''))
      .map((row) => {
        const values = row.split(',');
        return keys.reduce((acc, key, index) => {
          // @ts-ignore
          acc[key] = values[index] || null;
          return acc;
        }, {});
      });
    mappedRows.pop();
    return mappedRows;
  }

  getGamesTitles(games: HowLongToBeatAccountCsvGames) {
    return games.map((game) => game.title);
  }

  async createMigrationJob(
    games: HowLongToBeatAccountCsvGames,
    oauthId: string,
  ) {
    return this.hltbMigrationQueue.add('migrate', { games, oauthId });
  }

  parseGameScore(score: string) {
    if (score === '0') {
      return score;
    }
    if (score === '100') {
      return '10-0';
    }
    return score.split('').join('-');
  }

  parseGameCompletionTime(time: ParseGameCompletionTimeArgs) {
    if (time.completionist !== '--') {
      return this.splitGameCompletionTime(time.completionist);
    }
    if (time['main+extra'] !== '--') {
      return this.splitGameCompletionTime(time['main+extra']);
    }
    if (time.mainstory !== '--') {
      return this.splitGameCompletionTime(time['mainstory']);
    }
    return {
      hours: '0',
      minutes: '0',
      seconds: '0',
    };
  }

  splitGameCompletionTime(time: string) {
    const [hours, minutes, seconds] = time.split(':');
    console.log(hours);
    return {
      hours,
      minutes,
      seconds,
    };
  }

  parseGameStatus(statuses: ParseGameStatusArgs) {
    if (statuses.completed) {
      return GameStatus.COMPLETED;
    }
    if (statuses.retired) {
      return GameStatus.RETIRED;
    }
    return GameStatus.IN_PROGRESS;
  }
}

type ParseGameStatusArgs = {
  playing: string | null;
  backlog: string | null;
  replay: string | null;
  completed: string | null;
  retired: string | null;
};

type ParseGameCompletionTimeArgs = {
  mainstory: string;
  'main+extra': string;
  completionist: string;
};
