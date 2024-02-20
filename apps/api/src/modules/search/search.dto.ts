import { z } from 'zod';

export const SearchGameResultDto = z.object({
  id: z.number(),
  name: z.string(),
  coverSmallUrl: z.string(),
  coverBigUrl: z.string(),
  coverMediumUrl: z.string(),
  firstReleaseDate: z.number(),
  platforms: z.array(z.object({ name: z.string(), slug: z.string() })),
  genres: z.array(z.object({ name: z.string(), slug: z.string() })),
  completionTime: z.object({
    mainStory: z.number().nullable(),
    mainExtra: z.number().nullable(),
    completionist: z.number().nullable(),
  }),
});

export type SearchGameResultDtoType = z.infer<typeof SearchGameResultDto>;
