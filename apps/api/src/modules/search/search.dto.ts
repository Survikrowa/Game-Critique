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
});

export type SearchGameResultDtoType = z.infer<typeof SearchGameResultDto>;
