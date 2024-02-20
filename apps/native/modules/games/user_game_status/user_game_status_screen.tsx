import { useLocalSearchParams } from "expo-router";
import { Card, ScrollView, Separator, Spinner, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { useUserGameStatus } from "./use_user_game_status/use_user_game_status";
import { UserGameStatusAchievementsCompletedSection } from "./user_game_status_sections/user_game_status_achievements_completed_section/user_game_status_achievements_completed_section";
import { UserGameStatusCompletedInSection } from "./user_game_status_sections/user_game_status_completed_in_section/user_game_status_completed_in_section";
import { UserGameStatusGameCompletionSection } from "./user_game_status_sections/user_game_status_game_completion_section/user_game_status_game_completion_section";
import { UserGameStatusMainSection } from "./user_game_status_sections/user_game_status_main_section/user_game_status_main_section";
import {
  getPlatformText,
  UserGameStatusPlatformSection,
} from "./user_game_status_sections/user_game_status_platform_section/user_game_status_platform_section";
import { UserGameStatusReviewSection } from "./user_game_status_sections/user_game_status_review_section/user_game_status_review_section";
import { UserGameStatusScoreSection } from "./user_game_status_sections/user_game_status_score_section/user_game_status_score_section";
import { GameStatus } from "../../../__generated__/types";

export const UserGameStatusScreen = () => {
  const { games_status_id, oauth_id } = useLocalSearchParams<{
    games_status_id: string;
    oauth_id: string;
  }>();
  const userGameStatusQuery = useUserGameStatus({
    gameStatusId: games_status_id,
    oauthId: oauth_id,
  });
  if (userGameStatusQuery.loading || !userGameStatusQuery.data) {
    return (
      <XStack width="100%" alignItems="center" gap={8}>
        <Spinner size="large" />
        <Text size="large" weight="bold" color="primary">
          Trwa ładowanie danych gry...
        </Text>
      </XStack>
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
      <Card bordered height="min-content" width="100%">
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
        </Card.Header>
      </Card>
    </ScrollView>
  );
};
