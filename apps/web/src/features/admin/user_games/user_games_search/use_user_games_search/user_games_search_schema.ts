import { z } from "zod";

export const UserGamesSearchSchema = z.object({
  oauthId: z.string({ required_error: "Username is required" }).min(1),
  groupDuplicates: z.boolean(),
});
