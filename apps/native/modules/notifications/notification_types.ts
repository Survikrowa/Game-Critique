import { z } from "zod";

export const NotificationDataSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("game"), hltbId: z.number() }),
  z.object({ type: z.literal("friend"), oauthId: z.string() }),
  z.object({ type: z.literal("stats") }),
]);

export type NotificationData = z.infer<typeof NotificationDataSchema>;
