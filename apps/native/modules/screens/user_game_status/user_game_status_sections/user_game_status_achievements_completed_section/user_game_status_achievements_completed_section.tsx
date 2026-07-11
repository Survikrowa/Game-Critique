import { Image, View } from "react-native";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

const TrophyPlatinium = require("./assets/trophy-platinium.png");

export const UserGameStatusAchievementsCompletedSection = () => {
  return (
    <VStack className="items-center g-4">
      <Text size="large" weight="bold" color="primary">
        Posiadam platyne
      </Text>
      <View className="w-8 h-16">
        <Image source={TrophyPlatinium} className="w-full h-full" />
      </View>
    </VStack>
  );
};
