import { Menu, User } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

import { ButtonIcon } from "../../ui/forms/button_icon";
import { Text } from "../../ui/typography/text";

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
        <Text size="medium" color="primary" weight="semiBold">
          GC
        </Text>
        <XStack gap={8}>
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
