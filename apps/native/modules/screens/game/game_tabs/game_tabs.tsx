import { Check } from "lucide-react-native";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "ui/typography/text";

import { Card } from "@/ui/panels/card/card";
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
    // @ts-ignore — pre-existing route type issue
    router.push(`${redirect.addToGameStatusUrl}/${game.hltbId}`);
  };
  return (
    <Card className="w-full flex-row justify-between overflow-hidden">
      <Pressable
        className="items-center flex-1"
        onPress={redirectToGamesStatusAddForm}
      >
        <Check size={16} color="#3B82F6" />
        <VStack className="items-center">
          <Text size="small" weight="semiBold" color="primary">
            Dodaj do
          </Text>
          <Text size="small" weight="semiBold" color="primary">
            swoich gier
          </Text>
        </VStack>
      </Pressable>
    </Card>
  );
};
