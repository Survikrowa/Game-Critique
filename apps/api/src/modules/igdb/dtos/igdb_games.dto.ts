import { z } from 'zod';

export const igdbGamesSchema = z.array(
  z.object({
    id: z.number(),
    cover: z.object({ id: z.number(), game: z.number(), url: z.string() }),
    first_release_date: z.number().optional(),
    genres: z
      .array(z.object({ name: z.string(), slug: z.string(), id: z.number() }))
      .optional(),
    name: z.string(),
    slug: z.string(),
    url: z.string(),
    platforms: z
      .array(z.object({ name: z.string(), id: z.number(), slug: z.string() }))
      .nullish(),
  }),
);

export type IGDBGamesDto = z.infer<typeof igdbGamesSchema>;
