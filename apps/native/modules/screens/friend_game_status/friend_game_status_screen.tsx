import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { getPlatformText } from "../user_game_status/get_platform_text/get_platform_text";
import { useUserGameStatus } from "../user_game_status/use_user_game_status/use_user_game_status";
import { UserGameStatusFriendsReviews } from "../user_game_status/user_game_status_friends_reviews/user_game_status_friends_reviews";
import { GameStatusAchievements } from "../game_status_shared/game_status_achievements";
import { GameStatusCompletionTime } from "../game_status_shared/game_status_completion_time";
import { GameStatusHero } from "../game_status_shared/game_status_hero";
import { GameStatusInfoCards } from "../game_status_shared/game_status_info_cards";
import { GameStatusReview } from "../game_status_shared/game_status_review";
import { useSetHeaderTitle } from "../../router/use_set_header_title";

import { GameStatus } from "@/__generated__/types";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";

const STATUS_BADGE: Record<
  GameStatus,
  { label: string; color: "success" | "primary" | "warning" | "background" }
> = {
  [GameStatus.InProgress]: { label: "W trakcie", color: "primary" },
  [GameStatus.Completed]: { label: "Ukończona", color: "success" },
  [GameStatus.Retired]: { label: "Porzucona", color: "warning" },
  [GameStatus.Backlog]: { label: "Backlog", color: "background" },
};

const FriendGameStatusSkeleton = () => (
  <View>
    <Skeleton style={{ height: 260, width: "100%" }} />
    <View className="gap-3 p-4">
      <View className="flex-row gap-3">
        <Skeleton className="flex-1 rounded-2xl" style={{ height: 80 }} />
        <Skeleton className="flex-1 rounded-2xl" style={{ height: 80 }} />
      </View>
    </View>
  </View>
);

export const FriendGameStatusScreen = () => {
  const { games_status_id, oauth_id } = useLocalSearchParams<{
    games_status_id: string;
    oauth_id: string;
  }>();
  const userGameStatusQuery = useUserGameStatus({
    gameStatusId: games_status_id,
    oauthId: oauth_id,
  });
  useSetHeaderTitle(userGameStatusQuery.data?.userGameStatus?.game.name || "");

  if (userGameStatusQuery.loading || !userGameStatusQuery.data) {
    return <FriendGameStatusSkeleton />;
  }

  if (userGameStatusQuery.error) {
    return (
      <ErrorState
        title="Nie udało się załadować"
        description="Spróbuj ponownie za chwilę"
        onRetry={() => userGameStatusQuery.refetch()}
      />
    );
  }

  const gameStatus = userGameStatusQuery.data.userGameStatus;
  const badge = STATUS_BADGE[gameStatus.status];
  const shouldDisplayCompletedIn =
    gameStatus.status === GameStatus.Completed &&
    gameStatus.completedIn &&
    (gameStatus.completedIn.hours != null ||
      gameStatus.completedIn.minutes != null ||
      gameStatus.completedIn.seconds != null);

  return (
    <ScrollView
      className="h-full"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <GameStatusHero
        coverUrl={gameStatus.game.cover?.bigUrl}
        gameName={gameStatus.game.name}
        statusBadge={{ label: badge.label, color: badge.color }}
      />

      <View className="pb-10" style={{ gap: 16, marginTop: -2 }}>
        <GameStatusInfoCards
          platformName={gameStatus.platform.name}
          platformLabel={getPlatformText(gameStatus.status)}
          score={gameStatus.score}
        />

        {shouldDisplayCompletedIn && (
          <GameStatusCompletionTime
            hours={gameStatus.completedIn?.hours}
            minutes={gameStatus.completedIn?.minutes}
            seconds={gameStatus.completedIn?.seconds}
          />
        )}

        {gameStatus.achievementsCompleted && <GameStatusAchievements />}

        {gameStatus.review && <GameStatusReview review={gameStatus.review} />}

        <UserGameStatusFriendsReviews
          redirect={{ review: "friends" }}
          gameStatusId={gameStatus.id}
        />
      </View>
    </ScrollView>
  );
};
