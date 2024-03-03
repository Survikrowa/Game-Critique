import { Spinner, YStack } from "tamagui";

import { GoogleLogo } from "./assets/google_logo";
import { useAuth } from "./use_auth";
import { AppLogo } from "../../assets/logo/app_logo";
import { ButtonWithIcon } from "../../ui/forms/button_icon";

export const AuthPage = () => {
  const { onLogin, isLoading } = useAuth();

  return (
    <YStack
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="50%"
    >
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
    </YStack>
  );
};
