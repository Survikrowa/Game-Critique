import { z } from "zod";

export const NotificationDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("game"),
    hltbId: z.number(),
    oauthId: z.string(),
    gamesStatusId: z.number(),
  }),
  z.object({ type: z.literal("friend_request"), oauthId: z.string() }),
  z.object({ type: z.literal("friend_accepted"), oauthId: z.string() }),
  z.object({ type: z.literal("stats") }),
  z.object({
    type: z.literal("release_reminder"),
    igdbId: z.number(),
    gameUrl: z.string(),
    gameName: z.string(),
  }),
]);

export type NotificationData = z.infer<typeof NotificationDataSchema>;
