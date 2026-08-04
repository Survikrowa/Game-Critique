import { useApolloClient } from "@apollo/client";
import { LogOut } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { ButtonWithIcon } from "../../../../ui/forms/button_icon";
import { Text } from "../../../../ui/typography/text";

export const LogoutButton = () => {
  const { clearSession } = useAuth0();
  const client = useApolloClient();
  return (
    <ButtonWithIcon
      action="negative"
      onPress={async () => {
        await client.clearStore();
        await clearSession();
        router.push("/");
      }}
      icon={<LogOut size={18} color="#fff" />}
    >
      <Text size="small" weight="bold" color="white">
        Wyloguj się
      </Text>
    </ButtonWithIcon>
  );
};
