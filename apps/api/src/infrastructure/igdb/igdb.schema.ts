import { z } from 'zod';

export const IgdbGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  url: z.string().optional(),
  cover: z.object({ id: z.number(), url: z.string() }).optional(),
  first_release_date: z.number().optional(),
  platforms: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string().optional(),
      }),
    )
    .optional(),
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string().optional(),
      }),
    )
    .optional(),
  game_type: z.number().optional(),
  version_parent: z.number().optional(),
  parent_game: z.number().optional(),
});

export const IgdbGameRatingsResponseSchema = z.object({
  id: z.number(),
  aggregated_rating: z.number().optional(),
  aggregated_rating_count: z.number().optional(),
  rating: z.number().optional(),
  rating_count: z.number().optional(),
  url: z.string().optional(),
});

export type IgdbGame = z.infer<typeof IgdbGameSchema>;
export type IgdbGameRatingsResponse = z.infer<
  typeof IgdbGameRatingsResponseSchema
>;
