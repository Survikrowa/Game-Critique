import { router } from "expo-router";
import { ClipboardList } from "lucide-react-native";

import { useFriendsGameReviews } from "./use_friends_game_reviews/use_friends_game_reviews";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

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
    <VStack className="mt-4 gap-4">
      <ButtonWithIcon
        action="default"
        variant="outline"
        onPress={() => {
          router.push({
            pathname:
              redirect.review === "friends"
                ? "/friends/game_status_reviews/[game_status_id]"
                : "/games/game_status_reviews/[game_status_id]",
            params: { game_status_id: gameStatusId },
          });
        }}
        icon={<ClipboardList size={18} color="#3B82F6" />}
      >
        <Text size="large" weight="bold" color="primary">
          Zobacz recenzje znajomych
        </Text>
      </ButtonWithIcon>
    </VStack>
  );
};
