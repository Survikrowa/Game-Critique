import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "ui/typography/text";

import { truncateString } from "../../strings/truncate_string";

import { Button, ButtonIcon } from "@/ui/forms/button/button";
import { HStack } from "@/ui/layout/hstack/hstack";

type GoBackHeaderProps = {
  goBackUrl?: string;
  text: string;
};

export const GoBackHeader = ({ goBackUrl, text }: GoBackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <>
      <View style={{ paddingTop: insets.top }} pointerEvents="none" />
      <HStack className="bg-dark-800 p-8 justify-between items-center">
        <Button variant="link" onPress={() => router.back()}>
          <ButtonIcon as={ArrowLeft} className="h-8 w-8" />
        </Button>
        <HStack className="pr-3">
          <Text size="large" weight="bold" color="white">
            {truncateString(text, 20)}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
