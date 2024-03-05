import { Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { ButtonWithIcon } from "../../../../ui/forms/button_icon";

export const SearchButton = () => {
  return (
    <ButtonWithIcon
      onPress={() => {
        router.push("/search/search");
      }}
      icon={<Search color="$purple1" size="$2" />}
      backgrounded={false}
      backgroundColor="transparent"
      padding={4}
    />
  );
};
