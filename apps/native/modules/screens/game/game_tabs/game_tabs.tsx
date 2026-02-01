import { Check } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Card, View } from "tamagui";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

type GameTabsProps = {
  game: {
    name: string;
    hltbId: string;
  };
  redirect: {
    addToGameStatusUrl: string;
  };
};

export const GameTabs = ({ game, redirect }: GameTabsProps) => {
  const redirectToGamesStatusAddForm = () => {
    router.push(`${redirect.addToGameStatusUrl}/${game.hltbId}`);
  };
  return (
    <Card
      maxWidth="100%"
      width="100%"
      borderRadius="$2"
      padding={8}
      gap={8}
      backgroundColor="$color.container"
      overflow="hidden"
      justifyContent="space-between"
      height="min-content"
      flexDirection="row"
    >
      <View alignItems="center" flex={1} onPress={redirectToGamesStatusAddForm}>
        <Check size="$2" color="white" />
        <VStack className="items-center">
          <Text size="small" weight="semiBold" color="primary">
            Dodaj do
          </Text>
          <Text size="small" weight="semiBold" color="primary">
            swoich gier
          </Text>
        </VStack>
      </View>
    </Card>
  );
};
