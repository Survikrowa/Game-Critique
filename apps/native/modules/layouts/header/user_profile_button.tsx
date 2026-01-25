import { LogIn } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { ButtonWithIcon } from "@/ui/forms/button_icon";

export const UserProfileButton = () => {
  return (
    <ButtonWithIcon
      onPress={() => router.push("auth")}
      icon={<LogIn color="$purple1" size="$2" />}
      backgroundColor="transparent"
      padding={4}
    />
  );
};
