import { router } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "ui/typography/text";

import { haptic } from "@/modules/haptics/haptic";

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
  const handlePress = () => {
    haptic.medium();
    // @ts-ignore — pre-existing route type issue
    router.push(`${redirect.addToGameStatusUrl}/${game.hltbId}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <View className="flex-row items-center justify-center gap-2 bg-primary-500 rounded-2xl py-4 px-6">
        <PlusCircle size={20} color="#FFFFFF" />
        <Text size="medium" weight="bold" color="white">
          Dodaj do swoich gier
        </Text>
      </View>
    </Pressable>
  );
};
