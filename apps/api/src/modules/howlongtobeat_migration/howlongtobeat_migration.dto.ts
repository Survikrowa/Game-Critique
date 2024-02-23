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

export const HowLongToBeatAccountCsvGamesSchema = z.array(
  HowLongToBeatAccountCsvGameSchema,
);

export type HowLongToBeatAccountCsvGames = z.infer<
  typeof HowLongToBeatAccountCsvGamesSchema
>;

export type MigrateJobData = {
  games: HowLongToBeatAccountCsvGames;
  oauthId: string;
};
