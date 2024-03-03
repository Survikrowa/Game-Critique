import { z } from 'zod';

const HowLongToBeatAccountCsvGameSchema = z.object({
  title: z.string(),
  platform: z.string().nullable(),
  review: z.string(),
  mainstory: z.string(),
  'main+extras': z.string(),
  completionist: z.string(),
  playing: z.string().nullable(),
  backlog: z.string().nullable(),
  replay: z.string().nullable(),
  completed: z.string().nullable(),
  retired: z.string().nullable(),
  reviewnotes: z.string().nullable(),
});

export class HowLongToBeatAccountCsvGameBase {
  title: string;
  platform: string | null;
  review: string;
  mainstory: string;
  'main+extras': string;
  completionist: string;
  playing: string | null;
  backlog: string | null;
  replay: string | null;
  completed: string | null;
  retired: string | null;
  reviewnotes: string | null;
}

export const HowLongToBeatAccountCsvGamesSchema = z.array(
  HowLongToBeatAccountCsvGameSchema,
);

export type HowLongToBeatAccountCsvGames = z.infer<
  typeof HowLongToBeatAccountCsvGamesSchema
>;

export type HowLongToBeatAccountCsvGame = z.infer<
  typeof HowLongToBeatAccountCsvGameSchema
>;

export type MigrateJobData = {
  games: HowLongToBeatAccountCsvGames;
  oauthId: string;
};
