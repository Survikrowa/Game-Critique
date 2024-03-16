import { YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GameImage } from "../../../game/game_image/game_image";

type UserGameStatusMainSectionProps = {
  gameCover?: string;
  gameName: string;
};

export const UserGameStatusMainSection = ({
  gameCover,
  gameName,
}: UserGameStatusMainSectionProps) => {
  return (
    <YStack alignItems="center" gap={16}>
      <GameImage uri={gameCover} />
      <Text size="extraLarge" weight="bold" color="primary">
        {gameName}
      </Text>
    </YStack>
  );
};
