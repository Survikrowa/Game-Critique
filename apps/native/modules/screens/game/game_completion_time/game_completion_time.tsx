import { Text } from "ui/typography/text";

import { timeToRelative } from "../../../dates/time_to_relative";

import { Card } from "@/ui/panels/card/card";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";

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
    <Card className="w-full">
      <VStack className="p-4 gap-8">
        <HStack className="justify-between">
          <VStack className="items-center">
            <Text color="primary" weight="bold" size="large">
              Fabuła główna
            </Text>
            <Text color="primary" weight="normal" size="large">
              {timeToRelative(main)}
            </Text>
          </VStack>
          <Separator orientation="vertical" spacing="md" />
          <VStack className="items-center">
            <Text color="primary" weight="bold" size="large">
              Fabuła główna + extra
            </Text>
            <Text color="primary" weight="normal" size="large">
              {timeToRelative(mainExtra)}
            </Text>
          </VStack>
        </HStack>
        <Separator />
        <HStack>
          <VStack className="items-center">
            <Text color="primary" weight="bold" size="large">
              100%
            </Text>
            <Text color="primary" weight="normal" size="large">
              {timeToRelative(completionist)}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
