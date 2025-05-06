import { z } from "zod";

import { GameStatus } from "../../../../../__generated__/types";

export const GamesStatusFiltersFormSchema = z.object({
  sortBy: z.string().min(1, "Nie wybrano sortowania"),
  field: z.string().min(1, "Nie wybrano pola"),
  gameStatus: z.nativeEnum(GameStatus),
});

export type GamesStatusFiltersFormSchemaType = z.infer<
  typeof GamesStatusFiltersFormSchema
>;
