import { ToastProvider } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { LogBox } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { Toast } from "ui/feedback/toast/toast";

import { ApolloProvider } from "../modules/graphql/apollo_provider";
import { Header } from "../modules/layouts/header/header";
import { SafeToastViewport } from "../modules/layouts/safe_toast_viewport/safe_toast_viewport";
import tamaguiConfig from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

const AUTH0_DOMAIN = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;

LogBox.ignoreLogs([/bad setState[\s\S]*Themed/]);

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Auth0Provider clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <StatusBar style="light" backgroundColor="hsl(212, 35.0%, 9.2%)" />
        <TamaguiProvider config={tamaguiConfig}>
          <ApolloProvider>
            <ToastProvider>
              <Toast />
              <SafeToastViewport />
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
                  name="(app)/auth"
                  options={{ headerShown: true, header: Header }}
                />
                <Stack.Screen
                  name="(app)/(authorized)/user"
                  options={{ headerShown: true, header: Header }}
                />
              </Stack>
            </ToastProvider>
          </ApolloProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Auth0Provider>
  );
};

export default RootLayout;
