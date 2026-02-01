import { Spinner } from "tamagui";

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
        <Spinner size="large" />
      ) : (
        <ButtonWithIcon
          onPress={onLogin}
          icon={<GoogleLogo />}
          borderRadius={8}
        >
          Zaloguj się
        </ButtonWithIcon>
      )}
    </VStack>
  );
};
