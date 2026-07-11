import { Fragment } from "react";
import { Image, View } from "react-native";

import { parseStatus } from "../../parse_activity_text";

import { GameStatus } from "@/__generated__/types";
import { truncateString } from "@/modules/strings/truncate_string";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type UserActivityCardProps = {
  game: Game;
  ownerName?: string | null;
  displaySeparator: boolean;
};

type Game = {
  name: string;
  status: GameStatus;
  formattedUpdatedAt: string;
  cover?: string | null;
};

export const UserActivityCard = ({
  game,
  ownerName,
  displaySeparator,
}: UserActivityCardProps) => {
  return (
    <Fragment key={game.name + game.status}>
      <HStack className="justify-between">
        <VStack className="justify-between gap-1">
          <Text size="medium" color="primary" weight="bold">
            {truncateString(game.name, 20)}
          </Text>
          <VStack>
            {ownerName && (
              <Text size="medium" color="primary" weight="bold">
                {ownerName}{" "}
              </Text>
            )}
            <Text size="medium" color="primary" weight="normal">
              Dodał do {parseStatus(game.status)}{" "}
            </Text>
          </VStack>
          <Text
            size="medium"
            color="primary"
            weight="normal"
            transform="capitalize"
          >
            {game.formattedUpdatedAt}
          </Text>
        </VStack>
        <View className="w-20 h-20">
          {game.cover && (
            <Image
              resizeMode="contain"
              source={{ uri: game.cover }}
              className="w-full h-full"
            />
          )}
        </View>
      </HStack>

      {displaySeparator && <Separator spacing="xs" />}
    </Fragment>
  );
};
