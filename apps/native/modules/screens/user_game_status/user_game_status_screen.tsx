import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { Text } from "ui/typography/text";

import { getPlatformText } from "./get_platform_text/get_platform_text";
import { useUserGameStatus } from "./use_user_game_status/use_user_game_status";
import { UserGameStatusFriendsReviews } from "./user_game_status_friends_reviews/user_game_status_friends_reviews";
import { UserGameStatusAchievementsCompletedSection } from "./user_game_status_sections/user_game_status_achievements_completed_section/user_game_status_achievements_completed_section";
import { UserGameStatusCompletedInSection } from "./user_game_status_sections/user_game_status_completed_in_section/user_game_status_completed_in_section";
import { UserGameStatusGameCompletionSection } from "./user_game_status_sections/user_game_status_game_completion_section/user_game_status_game_completion_section";
import { UserGameStatusMainSection } from "./user_game_status_sections/user_game_status_main_section/user_game_status_main_section";
import { UserGameStatusPlatformSection } from "./user_game_status_sections/user_game_status_platform_section/user_game_status_platform_section";
import { UserGameStatusReviewSection } from "./user_game_status_sections/user_game_status_review_section/user_game_status_review_section";
import { UserGameStatusScoreSection } from "./user_game_status_sections/user_game_status_score_section/user_game_status_score_section";
import { useSetHeaderTitle } from "../../router/use_set_header_title";

import { GameStatus } from "@/__generated__/types";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Card } from "@/ui/panels/card/card";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";

type UserGameStatusScreenProps = {
  redirect: {
    review: "friends" | "games";
  };
};

export const UserGameStatusScreen = ({
  redirect,
}: UserGameStatusScreenProps) => {
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
    return (
      <HStack className="w-full items-center gap-2">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text size="large" weight="bold" color="primary">
          Trwa ładowanie danych gry...
        </Text>
      </HStack>
    );
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
  const shouldDisplayCompletedIn =
    gameStatus.status === GameStatus.Completed &&
    gameStatus.completedIn &&
    (gameStatus.completedIn.hours != null ||
      gameStatus.completedIn.minutes != null ||
      gameStatus.completedIn.seconds != null);
  return (
    <ScrollView className="h-full">
      <Card className="w-full">
        <VStack className="gap-4 p-4">
          <UserGameStatusMainSection
            gameName={gameStatus.game.name}
            gameCover={gameStatus.game.cover?.bigUrl}
          />
          <UserGameStatusGameCompletionSection gameStatus={gameStatus.status} />
          <Pressable
            onPress={() =>
              router.push("/search/game/" + gameStatus.game.hltbId)
            }
            className="min-h-[44px] flex-row items-center justify-center gap-2 rounded-full bg-background-100 px-4"
          >
            <Text color="primary">Zobacz grę</Text>
            <ArrowRight size={18} color="#64748B" />
          </Pressable>
          <UserGameStatusPlatformSection
            platformName={gameStatus.platform.name}
            platformText={getPlatformText(gameStatus.status)}
          />
          {shouldDisplayCompletedIn && (
            <UserGameStatusCompletedInSection
              hours={gameStatus.completedIn?.hours}
              minutes={gameStatus.completedIn?.minutes}
              seconds={gameStatus.completedIn?.seconds}
            />
          )}
          {gameStatus.score && (
            <UserGameStatusScoreSection score={gameStatus.score} />
          )}
          {(gameStatus.achievementsCompleted || gameStatus.review) && (
            <Separator spacing="xs" />
          )}
          {gameStatus.achievementsCompleted && (
            <UserGameStatusAchievementsCompletedSection />
          )}
          {gameStatus.review && (
            <UserGameStatusReviewSection review={gameStatus.review} />
          )}
          <UserGameStatusFriendsReviews
            redirect={redirect}
            gameStatusId={gameStatus.id}
          />
        </VStack>
      </Card>
    </ScrollView>
  );
};
