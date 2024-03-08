import { XStack } from "tamagui";
import { Text } from "ui/typography/text";

export const parseScore = (score: string) => score.replace("-", ".");

type UserGameStatusScoreSectionProps = {
  score: string;
};

export const UserGameStatusScoreSection = ({
  score,
}: UserGameStatusScoreSectionProps) => {
  return (
    <XStack alignItems="flex-start" gap={8}>
      <Text size="large" weight="bold" color="primary">
        Moja ocena:
      </Text>
      <Text size="large" weight="normal" color="primary">
        {parseScore(score)}
      </Text>
    </XStack>
  );
};
