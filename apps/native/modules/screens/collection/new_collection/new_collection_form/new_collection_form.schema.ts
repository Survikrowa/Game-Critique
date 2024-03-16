import { z } from "zod";

export const NewCollectionPageSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500),
});

export type NewCollectionPageFields = z.infer<typeof NewCollectionPageSchema>;
