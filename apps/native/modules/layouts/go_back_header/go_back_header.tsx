import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

import { ButtonWithIcon } from "../../../ui/forms/button_icon";
import { Text } from "../../../ui/typography/text";

type GoBackHeaderProps = {
  goBackUrl: string;
};

export const GoBackHeader = ({ goBackUrl }: GoBackHeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: insets.top }} />
      <XStack
        backgroundColor="black"
        space
        padding={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonWithIcon
          backgroundColor="transparent"
          onPress={() => router.replace(goBackUrl)}
          icon={<ArrowLeft width={32} height={32} size="$2" color="white" />}
        />
        <XStack paddingRight={12}>
          <Text size="large" weight="bold" color="primary">
            Tworzenie nowej kolekcji
          </Text>
        </XStack>
      </XStack>
    </>
  );
};
