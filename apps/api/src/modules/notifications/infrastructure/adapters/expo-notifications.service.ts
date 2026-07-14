import { Injectable } from '@nestjs/common';
import {
  NotificationsServicePort,
  PushNotificationData,
} from '../../domain/ports/notifications.service.port';

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: PushNotificationData;
  sound: string;
}

interface ExpoPushResponse {
  data?: Array<{ status: string }>;
  errors?: unknown[];
}

const EXPO_API_URL = 'https://exp.host/--/api/v2/push/send';
const DEFAULT_SOUND = 'default';

@Injectable()
export class ExpoNotificationsService implements NotificationsServicePort {
  async sendPush(
    token: string,
    title: string,
    body: string,
    data?: PushNotificationData,
  ): Promise<boolean> {
    const successCount = await this.sendToExpo([
      { to: token, title, body, data, sound: DEFAULT_SOUND },
    ]);
    return successCount > 0;
  }

  async sendBulkPush(
    tokens: string[],
    title: string,
    body: string,
    data?: PushNotificationData,
  ): Promise<number> {
    const messages: ExpoPushMessage[] = tokens.map((token) => ({
      to: token,
      title,
      body,
      data,
      sound: DEFAULT_SOUND,
    }));
    return this.sendToExpo(messages);
  }

  private async sendToExpo(messages: ExpoPushMessage[]): Promise<number> {
    try {
      const response = await fetch(EXPO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(messages),
      });

      if (!response.ok) {
        console.error(`Expo API error: ${response.status}`);
        return 0;
      }

      const result: ExpoPushResponse = await response.json();
      const successes =
        result.data?.filter((d) => d.status === 'ok').length ?? 0;
      return successes;
    } catch (error) {
      console.error(
        'Expo push send failed:',
        error instanceof Error ? error.message : error,
      );
      return 0;
    }
  }
}
