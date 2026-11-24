import { z } from 'zod';

export const IgdbTimeToBeatSchema = z.object({
  id: z.number().optional(),
  game_id: z.number(),
  hastily: z.number().optional(),
  normally: z.number().optional(),
  completely: z.number().optional(),
  count: z.number().optional(),
});

export type IgdbTimeToBeat = z.infer<typeof IgdbTimeToBeatSchema>;
