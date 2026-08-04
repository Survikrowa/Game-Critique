import { ActivityIndicator } from "react-native";

import { GoogleLogo } from "./assets/google_logo";
import { useAuth } from "./use_auth";

import { AppLogo } from "@/assets/logo/app_logo";
import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { VStack } from "@/ui/layout/vstack/vstack";

export const AuthScreen = () => {
  const { onLogin, isLoading } = useAuth();

  return (
    <VStack className="flex items-center justify-center h-1/2">
      <AppLogo width={128} height={128} fill="white" />
      {isLoading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : (
        <ButtonWithIcon
          onPress={onLogin}
          icon={<GoogleLogo />}
          className="rounded-lg"
        >
          Zaloguj się
        </ButtonWithIcon>
      )}
    </VStack>
  );
};
