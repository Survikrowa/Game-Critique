import { Fragment } from "react";
import { Image, Separator, View, XStack, YStack } from "tamagui";

import { GameStatus } from "../../../../../__generated__/types";
import { Text } from "../../../../../ui/typography/text";
import { truncateString } from "../../../../strings/truncate_string";
import { parseStatus } from "../../parse_activity_text";

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
      <XStack justifyContent="space-between">
        <YStack justifyContent="space-between" gap={4}>
          <Text size="medium" color="primary" weight="bold">
            {truncateString(game.name, 20)}
          </Text>
          <YStack>
            {ownerName && (
              <Text size="medium" color="primary" weight="bold">
                {ownerName}{" "}
              </Text>
            )}

            <Text size="medium" color="primary" weight="normal">
              Dodał do {parseStatus(game.status)}{" "}
            </Text>
          </YStack>

          <Text
            size="medium"
            color="primary"
            weight="normal"
            transform="capitalize"
          >
            {game.formattedUpdatedAt}
          </Text>
        </YStack>
        <View height="80" width="80">
          {game.cover && (
            <Image
              resizeMode="contain"
              source={{
                uri: game.cover,
                width: 100,
                height: 80,
              }}
            />
          )}
        </View>
      </XStack>

      {displaySeparator && <Separator marginVertical={8} />}
    </Fragment>
  );
};
