import { Text } from "ui/typography/text";

import { GameImage } from "../../../game/game_image/game_image";

import { VStack } from "@/ui/layout/vstack/vstack";

type UserGameStatusMainSectionProps = {
  gameCover?: string;
  gameName: string;
};

export const UserGameStatusMainSection = ({
  gameCover,
  gameName,
}: UserGameStatusMainSectionProps) => {
  return (
    <VStack className="items-center gap-4">
      <GameImage uri={gameCover} />
      <Text size="extraLarge" weight="bold" color="primary">
        {gameName}
      </Text>
    </VStack>
  );
};
