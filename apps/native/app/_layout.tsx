import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { LogBox } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../tamagui.config";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ApolloProvider } from "@/modules/graphql/apollo_provider";
import { Header } from "@/modules/layouts/header/header";

import "@/global.css";

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
    <GestureHandlerRootView>
      <GluestackUIProvider mode="dark">
        <TamaguiProvider config={tamaguiConfig}>
          <Auth0Provider clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN}>
            <SafeAreaProvider
              onLayout={onLayoutRootView}
              initialMetrics={initialWindowMetrics}
            >
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
                    name="(app)/auth"
                    options={{ headerShown: true, header: Header }}
                  />
                </Stack>
              </ApolloProvider>
            </SafeAreaProvider>
          </Auth0Provider>
        </TamaguiProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
