import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

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
      router.push(`/game/${parsed.data.hltbId}`);
      break;
    case "friend":
      router.push(`/friends/user_profile/${parsed.data.oauthId}`);
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
