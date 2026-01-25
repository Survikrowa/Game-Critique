import { ArrowLeft } from "@tamagui/lucide-icons";
import { router, useNavigation } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { truncateString } from "../../strings/truncate_string";

import { HStack } from "@/ui/layout/hstack/hstack";

type GoBackHeaderProps = {
  goBackUrl?: string;
  text: string;
};

export const GoBackHeader = ({ goBackUrl, text }: GoBackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <View style={{ paddingTop: insets.top }} pointerEvents="none" />
      <HStack className="bg-background-900 p-8" space="md">
        <ButtonWithIcon
          backgroundColor="transparent"
          onPress={() =>
            goBackUrl ? router.push(goBackUrl) : navigation.goBack()
          }
          icon={<ArrowLeft width={32} height={32} size="$2" color="white" />}
        />
        <HStack style={{ paddingRight: 12 }}>
          <Text size="large" weight="bold" color="white">
            {truncateString(text, 20)}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
