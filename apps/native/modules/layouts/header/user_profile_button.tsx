import { User } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { ButtonWithIcon } from "../../../ui/forms/button_icon";

export const UserProfileButton = () => {
  const { user } = useAuth0();
  const redirectTo = user ? "user" : "auth";
  return (
    <ButtonWithIcon
      onPress={() => router.push(redirectTo)}
      icon={<User color="$purple1" size="$2" />}
      backgroundColor="transparent"
      padding={4}
    />
  );
};
