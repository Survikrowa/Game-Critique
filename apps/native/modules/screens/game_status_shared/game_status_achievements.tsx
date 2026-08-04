import { Image, View } from "react-native";

import { Text } from "@/ui/typography/text";

const TrophyPlatinium = require("./assets/trophy-platinium.png");

export const GameStatusAchievements = () => {
  return (
    <View className="mx-4 items-center rounded-2xl bg-background-50 p-4">
      <Text size="large" weight="bold" color="primary">
        Posiadam platyne
      </Text>
      <View className="mt-2 h-16 w-8">
        <Image source={TrophyPlatinium} className="h-full w-full" />
      </View>
    </View>
  );
};
