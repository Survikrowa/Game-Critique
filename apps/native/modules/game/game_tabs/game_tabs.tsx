import { Check, Plus } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Card, H5, Separator, Tabs, View, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

type GameTabsProps = {
  game: {
    name: string;
    hltbId: string;
  };
};

export const GameTabs = ({ game }: GameTabsProps) => {
  const redirectToCollectionAddForm = () => {
    router.push(`/collection/collection_add_form/${game.hltbId}`);
  };

  const redirectToGamesStatusAddForm = () => {
    router.push(`/games/games_status_add_form/${game.hltbId}`);
  };
  return (
    <Card
      maxWidth="100%"
      width="100%"
      borderRadius="$2"
      padding={8}
      gap={8}
      overflow="hidden"
      borderColor="black"
      justifyContent="space-between"
      height="min-content"
      flexDirection="row"
      bordered
    >
      <View alignItems="center" flex={1} onPress={redirectToCollectionAddForm}>
        <Plus size="$2" color="black" />
        <YStack alignItems="center">
          <Text size="small" weight="semiBold" color="primary">
            Dodaj do
          </Text>
          <Text size="small" weight="semiBold" color="primary">
            kolekcji
          </Text>
        </YStack>
      </View>
      <Separator vertical />
      <View alignItems="center" flex={1} onPress={redirectToGamesStatusAddForm}>
        <Check size="$2" color="black" />
        <YStack alignItems="center">
          <Text size="small" weight="semiBold" color="primary">
            Dodaj do
          </Text>
          <Text size="small" weight="semiBold" color="primary">
            swoich gier
          </Text>
        </YStack>
      </View>
    </Card>
  );
};
