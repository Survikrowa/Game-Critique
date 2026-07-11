import { LogIn } from "lucide-react-native";
import { router } from "expo-router";

import { Button, ButtonIcon } from "@/ui/forms/button/button";

export const UserProfileButton = () => {
  return (
    <Button onPress={() => router.push("auth")}>
      <ButtonIcon>
        <LogIn size={20} color="#ffffff" />
      </ButtonIcon>
    </Button>
  );
};
