export type NotificationData =
  | { type: "game"; hltbId: number }
  | { type: "friend"; oauthId: string }
  | { type: "stats" };
