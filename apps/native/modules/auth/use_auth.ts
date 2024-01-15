import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAuth0 } from "react-native-auth0";

import { useVerifyOrCreateLazyQuery } from "./auth_verify_graphql/auth_verify.generated";

export const useAuth = () => {
  const { authorize, getCredentials } = useAuth0();
  const [verifyOrCreateUser, { loading }] = useVerifyOrCreateLazyQuery();
  const toastController = useToastController();
  const onPress = async () => {
    try {
      await authorize({
        scope: "openid profile email",
        audience: "https://gamecritique.homa-server.eu",
      });
      const token = (await getCredentials())?.accessToken;
      if (token) {
        await SecureStore.setItemAsync("oauthToken", token);
        const { data } = await verifyOrCreateUser();
        if (data?.verify.authorized) {
          toastController.show("Witaj.", {
            description: "Zalogowano pomyślnie!",
            variant: "success",
          });
          return router.replace("/");
        }
        await SecureStore.deleteItemAsync("oauthToken");
        toastController.show("OAuthError", {
          description:
            "Coś poszło nie tak przy logowaniu za pomocą konta Google.",
          variant: "error",
        });
      }
    } catch (_) {
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
