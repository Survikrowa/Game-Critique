import { Card, Separator, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { timeToRelative } from "../../dates/time_to_relative";
type GameCompletionTimeProps = {
  main?: number;
  mainExtra?: number;
  completionist?: number;
};

export const GameCompletionTime = ({
  main = 0,
  mainExtra = 0,
  completionist = 0,
}: GameCompletionTimeProps) => {
  return (
    <Card width="100%" backgroundColor="$color.container">
      <Card.Header>
        <YStack padding={16}>
          <XStack justifyContent="space-between">
            <YStack alignItems="center">
              <Text color="primary" weight="bold" size="large">
                Fabuła główna
              </Text>
              <Text color="primary" weight="normal" size="large">
                {timeToRelative(main)}
              </Text>
            </YStack>
            <Separator alignSelf="stretch" vertical marginHorizontal={16} />

            <YStack alignItems="center">
              <Text color="primary" weight="bold" size="large">
                Fabuła główna + extra
              </Text>
              <Text color="primary" weight="normal" size="large">
                {timeToRelative(mainExtra)}
              </Text>
            </YStack>
          </XStack>
          <Separator marginVertical={32} />
          <XStack>
            <YStack alignItems="center">
              <Text color="primary" weight="bold" size="large">
                100%
              </Text>
              <Text color="primary" weight="normal" size="large">
                {timeToRelative(completionist)}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </Card.Header>
    </Card>
  );
};
