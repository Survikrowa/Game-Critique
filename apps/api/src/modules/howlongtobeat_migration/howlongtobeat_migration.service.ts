import {
  HowLongToBeatAccountCsvGameBase,
  HowLongToBeatAccountCsvGames,
  MigrateJobData,
} from './howlongtobeat_migration.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GameStatus } from '@prisma/client';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { Readable } from 'stream';
export class HowLongToBeatMigrationService {
  constructor(
    @InjectQueue('hltbMigration')
    private hltbMigrationQueue: Queue<MigrateJobData>,
    private readonly csvParser: CsvParser,
  ) {}
  async parseCsvFile(file: Express.Multer.File) {
    const stream = Readable.from(file.buffer);
    const parsedData: ParsedData<
      InstanceType<typeof HowLongToBeatAccountCsvGameBase>
    > = await this.csvParser.parse(
      stream,
      HowLongToBeatAccountCsvGameBase,
      undefined,
      undefined,
      {
        separator: ',',
        mapHeaders: ({ header }: { header: string }) =>
          header.toLowerCase().replaceAll(' ', ''),
      },
    );
    return parsedData.list.map((game) => ({ ...game }));
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
    const [first, second] = score.split('');
    if (second === '0') {
      return first;
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

const initialReduceState = {
  title: '',
  platform: '',
  review: '',
  mainstory: '',
  'main+extras': '',
  completionist: '',
  playing: '',
  backlog: '',
  replay: '',
  completed: '',
  retired: '',
  reviewnotes: '',
};

const isKeyInReduceState = (
  key: string,
): key is keyof typeof initialReduceState => {
  return initialReduceState.hasOwnProperty(key);
};
