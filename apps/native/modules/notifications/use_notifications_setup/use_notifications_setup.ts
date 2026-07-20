import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { useRegisterPushTokenMutation } from "../notifications_graphql/register_push_token.generated";

const BYPASS_DEVICE_CHECK =
  process.env.EXPO_PUBLIC_BYPASS_DEVICE_CHECK === "true";

export const useNotificationsSetup = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [registerPushToken] = useRegisterPushTokenMutation();

  useEffect(() => {
    registerForPushNotifications(async (token, platform) => {
      await registerPushToken({ variables: { token, platform } });
    }, setExpoPushToken);
  }, [registerPushToken]);

  return { expoPushToken };
};

const registerForPushNotifications = async (
  register: (token: string, platform: string) => Promise<void>,
  setToken: (token: string | null) => void,
): Promise<void> => {
  if (!Device.isDevice && !BYPASS_DEVICE_CHECK) return;

  const permissionGranted = await requestPushPermission();
  if (!permissionGranted) return;

  const tokenData = await Notifications.getExpoPushTokenAsync();
  setToken(tokenData.data);

  await register(tokenData.data, Platform.OS);
};

const requestPushPermission = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
};
