import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { NotificationData } from "../notification_types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotificationHandler = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content
          .data as NotificationData;
        navigateFromNotification(data);
      },
    );
    return () => subscription.remove();
  }, []);
};

const navigateFromNotification = (data: NotificationData): void => {
  if (!data?.type) return;

  switch (data.type) {
    case "game":
      if (data.hltbId) router.push(`/game/${data.hltbId}`);
      break;
    case "friend":
      if (data.oauthId) router.push(`/friends/${data.oauthId}`);
      break;
    case "stats":
      router.push("/profile");
      break;
  }
};
