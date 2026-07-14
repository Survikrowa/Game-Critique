import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ApolloProvider } from "@/modules/graphql/apollo_provider";
import { Header } from "@/modules/layouts/header/header";
import { useNotificationsSetup } from "@/modules/notifications/use_notifications_setup/use_notifications_setup";
import { useNotificationHandler } from "@/modules/notifications/use_notification_handler/use_notification_handler";

import "@/global.css";

SplashScreen.preventAutoHideAsync();

const AUTH0_DOMAIN = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;

LogBox.ignoreLogs([/bad setState[\s\S]*Themed/]);

const RootLayout = () => {
  useNotificationsSetup();
  useNotificationHandler();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView>
      <GluestackUIProvider mode="dark">
        <Auth0Provider clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <StatusBar
              style="light"
              backgroundColor="#121212"
              animated
              translucent={false}
            />
            <ApolloProvider>
              <Stack>
                <Stack.Screen
                  name="(app)/(tabs)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(app)/search"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(app)/(authorized)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(app)/auth"
                  options={{ headerShown: true, header: Header }}
                />
              </Stack>
            </ApolloProvider>
          </SafeAreaProvider>
        </Auth0Provider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
