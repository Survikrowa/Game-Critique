import { Image, View, YStack } from "tamagui";
import { Text } from "ui/typography/text";

const TrophyPlatinium = require("./assets/trophy-platinium.png");

export const UserGameStatusAchievementsCompletedSection = () => {
  return (
    <YStack alignItems="center" gap={16}>
      <Text size="large" weight="bold" color="primary">
        Posiadam platyne
      </Text>
      <View width={32} height={64}>
        <Image source={{ uri: TrophyPlatinium, width: 32, height: 64 }} />
      </View>
    </YStack>
  );
};
