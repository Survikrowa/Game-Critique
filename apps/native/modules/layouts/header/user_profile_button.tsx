import { LogIn } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { Button, ButtonIcon } from "@/ui/forms/button/button";

export const UserProfileButton = () => {
  return (
    <Button onPress={() => router.push("auth")}>
      <ButtonIcon>
        <LogIn color="$purple1" size="$2" className="text-white bg-white" />
      </ButtonIcon>
    </Button>
  );
};
