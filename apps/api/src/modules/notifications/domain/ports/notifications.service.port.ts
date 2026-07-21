export const NOTIFICATIONS_SERVICE = Symbol('NOTIFICATIONS_SERVICE');

export type PushNotificationType =
  | 'game'
  | 'friend_request'
  | 'friend_accepted'
  | 'stats';

export interface PushNotificationData {
  type: PushNotificationType;
  hltbId?: number;
  oauthId?: string;
  gamesStatusId?: number;
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
