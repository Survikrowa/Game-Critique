import { ApolloProvider } from "@apollo/client";
import { ToastProvider } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useCallback } from "react";
import { Auth0Provider } from "react-native-auth0";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import { useNewApolloClient } from "../modules/graphql/apollo_client";
import { SafeToastViewport } from "../modules/layouts/safe_toast_viewport/safe_toast_viewport";
import tamaguiConfig from "../tamagui.config";
import { Toast } from "../ui/feedback/toast/toast";

SplashScreen.preventAutoHideAsync();

const AUTH0_DOMAIN = "dev-3gebv0fjdsc0gf5g.us.auth0.com";
const AUTH0_CLIENT_ID = "1H6FuOM2QcwiG8ZdQQJOdy6PL2r3ERQ6";

const RootLayout = () => {
  const apolloClient = useNewApolloClient();
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
          <Theme name="white">
            <ApolloProvider client={apolloClient}>
              <ToastProvider>
                <Toast />
                <SafeToastViewport />
                <Slot />
              </ToastProvider>
            </ApolloProvider>
          </Theme>
        </TamaguiProvider>
      </Auth0Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
