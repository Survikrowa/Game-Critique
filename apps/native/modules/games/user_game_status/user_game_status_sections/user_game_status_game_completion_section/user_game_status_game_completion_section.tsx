import { XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GameStatus } from "../../../../../__generated__/types";

const parseStatus = (status: GameStatus) => {
  switch (status) {
    case GameStatus.InProgress:
      return "W trakcie";
    case GameStatus.Completed:
      return "Ukończona";
    case GameStatus.Retired:
      return "Porzucona";
    default:
      return "Nieznany";
  }
};

type UserGameStatusGameCompletionSectionProps = {
  gameStatus: GameStatus;
};

export const UserGameStatusGameCompletionSection = ({
  gameStatus,
}: UserGameStatusGameCompletionSectionProps) => {
  return (
    <XStack alignItems="flex-start" gap={8}>
      <Text size="large" weight="bold" color="primary">
        Status:
      </Text>
      <Text size="large" weight="normal" color="primary">
        {parseStatus(gameStatus)}
      </Text>
    </XStack>
  );
};
