import { router } from "expo-router";
import { Fragment } from "react";
import { Image, Pressable, View } from "react-native";

import { parseStatus } from "../../parse_activity_text";

import { GameStatus } from "@/__generated__/types";
import { haptic } from "@/modules/haptics/haptic";
import { truncateString } from "@/modules/strings/truncate_string";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type UserActivityCardProps = {
  game: Game;
  ownerName?: string | null;
  oauthId: string;
  gameStatusId: number | null | undefined;
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
  oauthId,
  gameStatusId,
  displaySeparator,
}: UserActivityCardProps) => {
  const handlePress = () => {
    if (!gameStatusId || !oauthId) return;
    haptic.light();
    router.push({
      pathname: "/friends/games_status_info/[games_status_id]",
      params: { games_status_id: gameStatusId, oauth_id: oauthId },
    });
  };

  return (
    <Fragment key={game.name + game.status}>
      <Pressable
        onPress={handlePress}
        className="min-h-[44px]"
        disabled={!gameStatusId || !oauthId}
      >
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
          <View className="h-20 w-20">
            {game.cover && (
              <Image
                resizeMode="contain"
                source={{ uri: game.cover }}
                className="h-full w-full"
              />
            )}
          </View>
        </HStack>
      </Pressable>

      {displaySeparator && <Separator spacing="xs" />}
    </Fragment>
  );
};
