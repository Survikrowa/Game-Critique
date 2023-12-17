import { Menu, User } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

import { SearchButton } from "./search/search_button";
import { ButtonIcon } from "../../../ui/forms/button_icon";
import { Text } from "../../../ui/typography/text";

export const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: insets.top }} />
      <XStack
        backgroundColor="$purple11"
        space
        padding={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Text size="medium" color="primary" weight="semiBold">
            GC
          </Text>
        </Link>

        <XStack gap={8}>
          <SearchButton />
          <ButtonIcon
            onPress={() => {
              console.log("pressed");
            }}
          >
            <User color="$purple1" />
          </ButtonIcon>
          <ButtonIcon
            onPress={() => {
              console.log("pressed");
            }}
          >
            <Menu color="$purple1" />
          </ButtonIcon>
        </XStack>
      </XStack>
    </>
  );
};
