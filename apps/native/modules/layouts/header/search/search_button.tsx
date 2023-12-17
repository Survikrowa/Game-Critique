import { Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { ButtonIcon } from "../../../../ui/forms/button_icon";

export const SearchButton = () => {
  return (
    <ButtonIcon
      onPress={() => {
        router.push("search");
      }}
    >
      <Search color="$purple1" />
    </ButtonIcon>
  );
};
