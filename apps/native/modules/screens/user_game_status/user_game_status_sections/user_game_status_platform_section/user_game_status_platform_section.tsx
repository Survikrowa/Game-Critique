import { XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { getPlatformColor } from "./get_platform_color/get_platform_color";
import { GameStatus } from "../../../../../__generated__/types";

export const getPlatformText = (status: GameStatus) => {
  switch (status) {
    case GameStatus.InProgress:
      return "Ogrywana na:";
    case GameStatus.Completed:
      return "Ukończona na: ";
    case GameStatus.Retired:
      return "Porzucona na:";
    default:
      return "Nieznany";
  }
};

type UserGameStatusPlatformSectionProps = {
  platformName: string;
  platformText: string;
};

export const UserGameStatusPlatformSection = ({
  platformName,
  platformText,
}: UserGameStatusPlatformSectionProps) => {
  return (
    <XStack alignItems="flex-start" gap={8}>
      <Text size="large" weight="bold" color="primary">
        {platformText}
      </Text>
      <Text size="large" weight="normal" color={getPlatformColor(platformName)}>
        {platformName}
      </Text>
    </XStack>
  );
};
