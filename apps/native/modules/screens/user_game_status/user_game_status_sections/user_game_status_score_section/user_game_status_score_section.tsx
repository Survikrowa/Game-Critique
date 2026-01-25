import { Text } from "ui/typography/text";

import { parseScore } from "./parse_score";

import { HStack } from "@/ui/layout/hstack/hstack";

type UserGameStatusScoreSectionProps = {
  score: string;
};

export const UserGameStatusScoreSection = ({
  score,
}: UserGameStatusScoreSectionProps) => {
  return (
    <HStack className="flex-start gap-2">
      <Text size="large" weight="bold" color="primary">
        Moja ocena:
      </Text>
      <Text size="large" weight="normal" color="primary">
        {parseScore(score)}
      </Text>
    </HStack>
  );
};
