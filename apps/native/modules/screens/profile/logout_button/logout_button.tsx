import { useApolloClient } from "@apollo/client";
import { LogOut } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { ButtonWithIcon } from "../../../../ui/forms/button_icon";
import { Text } from "../../../../ui/typography/text";

export const LogoutButton = () => {
  const { clearSession } = useAuth0();
  const client = useApolloClient();
  return (
    <ButtonWithIcon
      backgroundColor="$red10"
      maxWidth={150}
      onPress={async () => {
        await client.clearStore();
        await clearSession();
        router.push("/");
      }}
      icon={<LogOut width={32} height={32} color="white" />}
    >
      <Text size="small" weight="bold" color="white">
        Wyloguj się
      </Text>
    </ButtonWithIcon>
  );
};
