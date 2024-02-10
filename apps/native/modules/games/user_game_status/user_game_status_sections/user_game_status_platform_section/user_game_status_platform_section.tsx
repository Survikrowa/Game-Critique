import { XStack } from "tamagui";
import { Text } from "ui/typography/text";

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

const getPlatformColor = (platform: string) => {
  if (platform.toLowerCase().includes("playstation")) {
    return "blue";
  }
  if (platform.toLowerCase().includes("xbox")) {
    return "green";
  }
  if (platform.toLowerCase().includes("nintendo")) {
    return "red";
  }
  return "primary";
};

type UserGameStatusPlatformSection = {
  platformName: string;
  platformText: string;
};

export const UserGameStatusPlatformSection = ({
  platformName,
  platformText,
}: UserGameStatusPlatformSection) => {
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
