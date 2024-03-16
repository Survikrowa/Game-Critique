import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAuth0 } from "react-native-auth0";

import { useVerifyOrCreateLazyQuery } from "./auth_verify_graphql/auth_verify.generated";

export const useAuth = () => {
  const { authorize, clearSession } = useAuth0();
  const [verifyOrCreateUser, { loading }] = useVerifyOrCreateLazyQuery({
    fetchPolicy: "no-cache",
  });
  const toastController = useToastController();
  const onPress = async () => {
    try {
      const authResponse = await authorize({
        scope: "openid profile email",
        audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      });
      if (authResponse && authResponse.accessToken) {
        await SecureStore.setItemAsync("oauthToken", authResponse.accessToken);
        const { data } = await verifyOrCreateUser();
        if (data?.verify.authorized) {
          toastController.show("Witaj.", {
            description: "Zalogowano pomyślnie!",
            variant: "success",
          });
          return router.push("/home");
        }
        await SecureStore.deleteItemAsync("oauthToken");
        await clearSession();
        toastController.show("OAuthError", {
          description:
            "Coś poszło nie tak przy logowaniu za pomocą konta Google.",
          variant: "error",
        });
      }
    } catch (_) {
      await clearSession();
      toastController.show("OAuthError", {
        description:
          "Coś poszło nie tak przy logowaniu za pomocą konta Google.",
        variant: "error",
      });
    }
  };

  return {
    onLogin: onPress,
    isLoading: loading,
  };
};
