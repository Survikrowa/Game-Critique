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
      <View
        className="bg-background-50"
        style={{ paddingTop: insets.top }}
        pointerEvents="none"
      />
      <HStack className="items-center justify-between border-b border-outline-0 bg-background-50 px-4 py-3">
        <Button variant="link" onPress={() => router.back()}>
          <ButtonIcon as={ArrowLeft} className="h-6 w-6" />
        </Button>
        <HStack className="pr-3">
          <Text size="large" weight="bold" color="primary">
            {truncateString(text, 20)}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
