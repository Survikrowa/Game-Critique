import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";

import { useNotificationHistoryStore } from "../notification_history_store";
import { NotificationDataSchema } from "../notification_types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const navigateFromNotification = (data: unknown): void => {
  const parsed = NotificationDataSchema.safeParse(data);
  if (!parsed.success) return;

  const { type } = parsed.data;

  switch (type) {
    case "game":
      router.push(
        `/friends/games_status_info/${parsed.data.gamesStatusId}?oauth_id=${parsed.data.oauthId}`,
      );
      break;
    case "friend_request":
      router.push("/friends/friends_requests");
      break;
    case "friend_accepted":
      router.push("/friends/friends_list");
      break;
    case "stats":
      router.push("/profile");
      break;
  }
};

export const useNotificationHandler = () => {
  const addNotification = useNotificationHistoryStore((s) => s.addNotification);
  const markAsRead = useNotificationHistoryStore((s) => s.markAsRead);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const parsed = NotificationDataSchema.safeParse(
          notification.request.content.data,
        );
        if (!parsed.success) return;

        addNotification({
          id: notification.request.identifier,
          type: parsed.data.type,
          title: notification.request.content.title || "",
          body: notification.request.content.body || "",
          data: parsed.data,
          receivedAt: new Date().toISOString(),
          isRead: false,
        });
      },
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        markAsRead(response.notification.request.identifier);
        navigateFromNotification(data);
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [addNotification, markAsRead]);
};
