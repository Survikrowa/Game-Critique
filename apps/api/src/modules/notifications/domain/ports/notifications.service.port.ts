export const NOTIFICATIONS_SERVICE = Symbol('NOTIFICATIONS_SERVICE');

export type PushNotificationType =
  | 'game'
  | 'friend_request'
  | 'friend_accepted'
  | 'stats'
  | 'release_reminder';

export interface PushNotificationData {
  type: PushNotificationType;
  hltbId?: number;
  oauthId?: string;
  gamesStatusId?: number;
  igdbId?: number;
  gameUrl?: string;
  gameName?: string;
}

export interface NotificationsServicePort {
  sendPush(
    token: string,
    title: string,
    body: string,
    data?: PushNotificationData,
  ): Promise<boolean>;
  sendBulkPush(
    tokens: string[],
    title: string,
    body: string,
    data?: PushNotificationData,
  ): Promise<number>;
}
