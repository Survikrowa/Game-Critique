import { ChevronRight, MessageSquare } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView } from "react-native";

import { useGameStatusReviewStore } from "./use_game_status_review_store/use_game_status_review_store";
import { truncateString } from "../../strings/truncate_string";
import { UserAvatar } from "../../user/user_avatar/user_avatar";
import { useFriendsGameReviews } from "../user_game_status/user_game_status_friends_reviews/use_friends_game_reviews/use_friends_game_reviews";
import { parseScore } from "../user_game_status/user_game_status_sections/user_game_status_score_section/parse_score";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

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
      <HStack className="items-center w-full">
        <ActivityIndicator size="large" color="#3B82F6" />
      </HStack>
    );
  }
  if (
    friendsGameReviewsQuery.data?.ownerAndFriendsGameStatusReviews.length === 0
  ) {
    return (
      <EmptyState
        title="Brak recenzji"
        description="Żaden ze znajomych nie ocenił jeszcze tej gry"
        icon={<MessageSquare size={32} color="#3B82F6" />}
      />
    );
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
    <ScrollView className="max-h-[99%]">
      <VStack className="p-4">
        {friendsGameReviews.map((review) => {
          return (
            <Pressable
              className="gap-2"
              key={review.profile?.avatarUrl}
              onPress={() => {
                handleReviewClick({
                  message: review.review || "",
                  authorName: review.profile?.name || "",
                });
              }}
            >
              <HStack className="justify-between items-center">
                <HStack className="gap-2 items-center">
                  <UserAvatar
                    size="$3"
                    avatarUrl={review.profile?.avatarUrl || ""}
                  />
                  <VStack className="gap-2">
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
                  </VStack>
                </HStack>
                {review.review && <ChevronRight size={16} color="#64748B" />}
              </HStack>
              <Separator spacing="xs" />
            </Pressable>
          );
        })}
      </VStack>
    </ScrollView>
  );
};
