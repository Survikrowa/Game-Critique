import { ClipboardList } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { YStack } from "tamagui";

import { useFriendsGameReviews } from "./use_friends_game_reviews/use_friends_game_reviews";
import { ButtonWithIcon } from "../../../../ui/forms/button_icon";
import { Text } from "../../../../ui/typography/text";

type UserGameStatusFriendsReviewsProps = {
  gameStatusId: number;
  redirect: {
    review: "friends" | "games";
  };
};

export const UserGameStatusFriendsReviews = ({
  gameStatusId,
  redirect,
}: UserGameStatusFriendsReviewsProps) => {
  const { data, loading } = useFriendsGameReviews({
    gameStatusId,
  });

  if (loading || data?.ownerAndFriendsGameStatusReviews.length === 0) {
    return null;
  }
  return (
    <YStack gap={16} marginTop={16}>
      <ButtonWithIcon
        borderColor="white"
        backgroundColor="transparent"
        onPress={() => {
          router.push(
            `/${redirect.review}/game_status_reviews/${gameStatusId}`,
          );
        }}
        icon={<ClipboardList color="white" />}
      >
        <Text size="large" weight="bold" color="primary">
          Zobacz recenzje znajomych
        </Text>
      </ButtonWithIcon>
    </YStack>
  );
};
