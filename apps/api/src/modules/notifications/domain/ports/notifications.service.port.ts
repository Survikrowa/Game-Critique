export const NOTIFICATIONS_SERVICE = Symbol('NOTIFICATIONS_SERVICE');

export interface PushNotificationData {
  type: 'game' | 'friend' | 'stats';
  hltbId?: number;
  oauthId?: string;
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
