import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useCallback } from "react";
import { Auth0Provider } from "react-native-auth0";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { Header } from "../modules/layouts/header/header";
import tamaguiConfig from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const AUTH0_DOMAIN = "dev-3gebv0fjdsc0gf5g.us.auth0.com";
const AUTH0_CLIENT_ID = "oxYCBHUtxTA6ms5vnBBsNN1MRj1ljpjv";

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
      <Auth0Provider clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN}>
        <TamaguiProvider config={tamaguiConfig}>
          <ApolloProvider client={apolloClient}>
            <Header />
            <Slot />
          </ApolloProvider>
        </TamaguiProvider>
      </Auth0Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
