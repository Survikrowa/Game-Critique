import { ToastProvider } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useCallback } from "react";
import { LogBox } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { Toast } from "ui/feedback/toast/toast";

import { ApolloProvider } from "../modules/graphql/apollo_provider";
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
        <TamaguiProvider config={tamaguiConfig}>
          <ApolloProvider>
            <ToastProvider>
              <Toast />
              <SafeToastViewport />
              <Slot />
            </ToastProvider>
          </ApolloProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </Auth0Provider>
  );
};

export default RootLayout;
