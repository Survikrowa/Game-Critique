import { ArrowLeft } from "@tamagui/lucide-icons";
import { router, useNavigation } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { truncateString } from "../../strings/truncate_string";

type GoBackHeaderProps = {
  goBackUrl?: string;
  text: string;
};

export const GoBackHeader = ({ goBackUrl, text }: GoBackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <View style={{ paddingTop: insets.top }} />
      <XStack
        backgroundColor="$color.container"
        space
        padding={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonWithIcon
          backgroundColor="transparent"
          onPress={() =>
            goBackUrl ? router.push(goBackUrl) : navigation.goBack()
          }
          icon={<ArrowLeft width={32} height={32} size="$2" color="white" />}
        />
        <XStack paddingRight={12}>
          <Text size="large" weight="bold" color="white">
            {truncateString(text, 20)}
          </Text>
        </XStack>
      </XStack>
    </>
  );
};
