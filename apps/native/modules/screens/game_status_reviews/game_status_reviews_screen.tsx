import { ChevronRight } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, Spinner, XStack, YStack } from "tamagui";

import { useGameStatusReviewStore } from "./use_game_status_review_store/use_game_status_review_store";
import { Text } from "../../../ui/typography/text";
import { truncateString } from "../../strings/truncate_string";
import { UserAvatar } from "../../user/user_avatar/user_avatar";
import { useFriendsGameReviews } from "../user_game_status/user_game_status_friends_reviews/use_friends_game_reviews/use_friends_game_reviews";
import { parseScore } from "../user_game_status/user_game_status_sections/user_game_status_score_section/parse_score";

type GameStatusReviewsScreenProps = {
  redirect: {
    review: "friends" | "games";
  };
};

export const GameStatusReviewsScreen = ({
  redirect,
}: GameStatusReviewsScreenProps) => {
  const { game_status_id } = useLocalSearchParams<{ game_status_id: string }>();
  const friendsGameReviewsQuery = useFriendsGameReviews({
    gameStatusId: Number(game_status_id) || 0,
  });
  const setCurrentReview = useGameStatusReviewStore(
    (state) => state.setCurrentReview,
  );
  if (friendsGameReviewsQuery.loading || !friendsGameReviewsQuery.data) {
    return (
      <XStack alignItems="center" width="100%">
        <Spinner size="large" />
      </XStack>
    );
  }
  if (
    friendsGameReviewsQuery.data?.ownerAndFriendsGameStatusReviews.length === 0
  ) {
    return null;
  }
  if (!game_status_id) {
    return null;
  }
  const friendsGameReviews =
    friendsGameReviewsQuery.data.ownerAndFriendsGameStatusReviews;

  const handleReviewClick = (review: {
    authorName: string;
    message: string;
  }) => {
    if (review.message.length === 0) {
      return;
    }
    setCurrentReview(review);
    router.push(`/${redirect.review}/game_status_review`);
  };
  return (
    <ScrollView maxHeight="99%">
      <YStack padding={16}>
        {friendsGameReviews.map((review) => {
          return (
            <YStack
              gap={8}
              key={review.profile?.avatarUrl}
              onPress={() => {
                handleReviewClick({
                  message: review.review || "",
                  authorName: review.profile?.name || "",
                });
              }}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={8} alignItems="center">
                  <UserAvatar
                    size="$3"
                    avatarUrl={review.profile?.avatarUrl || ""}
                  />
                  <YStack gap={8}>
                    <Text size="medium" weight="bold" color="primary">
                      {truncateString(review.profile?.name || "", 20)}
                    </Text>

                    {review.score && (
                      <Text size="small" weight="normal" color="primary">
                        Ocena gry {parseScore(review.score)}
                      </Text>
                    )}

                    {review.review && (
                      <>
                        <Separator />
                        <Text size="small" color="primary" weight="normal">
                          {truncateString(review.review, 40)}
                        </Text>
                      </>
                    )}
                  </YStack>
                </XStack>
                {review.review && <ChevronRight color="white" />}
              </XStack>
              <Separator marginVertical={8} />
            </YStack>
          );
        })}
      </YStack>
    </ScrollView>
  );
};
