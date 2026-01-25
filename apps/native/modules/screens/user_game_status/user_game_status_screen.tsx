import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Card, ScrollView, Separator, Spinner } from "tamagui";
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
import { GameStatus } from "../../../__generated__/types";
import { HStack } from "../../../ui/layout/hstack/hstack";
import { useSetHeaderTitle } from "../../router/use_set_header_title";

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
        <Spinner size="large" />
        <Text size="large" weight="bold" color="primary">
          Trwa ładowanie danych gry...
        </Text>
      </HStack>
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
    <ScrollView>
      <Card
        backgroundColor="$color.container"
        height="min-content"
        width="100%"
      >
        <Card.Header gap={16}>
          <UserGameStatusMainSection
            gameName={gameStatus.game.name}
            gameCover={gameStatus.game.cover?.bigUrl}
          />
          <UserGameStatusGameCompletionSection gameStatus={gameStatus.status} />
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
            <Separator marginVertical={8} />
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
        </Card.Header>
      </Card>
    </ScrollView>
  );
};
