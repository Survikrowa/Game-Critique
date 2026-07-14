import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useRegisterPushTokenMutation } from "../notifications_graphql/register_push_token.generated";

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
  if (!Device.isDevice) return;

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
