import { YStack } from "tamagui";

import GoogleLogo from "./assets/logo_google.svg";
import { useAuth } from "./use_auth";
import AppLogo from "../../assets/logo/logo_app.svg";
import { ButtonWithIcon } from "../../ui/forms/button_icon";

export const AuthPage = () => {
  const { onLogin } = useAuth();

  return (
    <YStack
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="50%"
    >
      <AppLogo width={128} height={128} style={{ color: "black" }} />
      <ButtonWithIcon
        onPress={onLogin}
        icon={<GoogleLogo width={48} height={48} />}
        borderRadius={8}
      >
        Zaloguj się
      </ButtonWithIcon>
    </YStack>
  );
};
