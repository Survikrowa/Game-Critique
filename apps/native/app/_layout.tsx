import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { Header } from "../modules/layouts/header";
import tamaguiConfig from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <TamaguiProvider config={tamaguiConfig}>
        <ApolloProvider client={apolloClient}>
          <Header />
          <Slot />
        </ApolloProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
