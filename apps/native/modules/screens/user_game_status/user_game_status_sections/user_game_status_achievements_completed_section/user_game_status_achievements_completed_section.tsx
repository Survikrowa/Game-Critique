import { Image, View } from "tamagui";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

const TrophyPlatinium = require("./assets/trophy-platinium.png");

export const UserGameStatusAchievementsCompletedSection = () => {
  return (
    <VStack className="items-center g-4">
      <Text size="large" weight="bold" color="primary">
        Posiadam platyne
      </Text>
      <View width={32} height={64}>
        <Image source={{ uri: TrophyPlatinium, width: 32, height: 64 }} />
      </View>
    </VStack>
  );
};
