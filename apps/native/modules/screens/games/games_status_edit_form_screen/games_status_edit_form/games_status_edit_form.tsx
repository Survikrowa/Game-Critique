import { KeyboardAvoidingView } from "react-native";
import { Card, ScrollView, Separator, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GamesStatusForm } from "../../../../games_status/games_status_form/games_status_form";
import { truncateString } from "../../../../strings/truncate_string";
import { UserGameStatusQuery } from "../../../user_game_status/use_user_game_status/user_game_status_query.generated";

type GamesStatusEditFormProps = {
  gameStatus: UserGameStatusQuery["userGameStatus"];
};
export const GamesStatusEditForm = ({
  gameStatus,
}: GamesStatusEditFormProps) => {
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <Card
          padding={16}
          gap={8}
          borderRadius="$2"
          backgroundColor="$color.container"
          height="100%"
        >
          <Card.Header>
            <XStack alignItems="center" gap={4} justifyContent="center">
              <Text size="medium" weight="semiBold" color="primary">
                Aktualnie edytujesz:
              </Text>
              <Text size="large" weight="bold" color="primary">
                {truncateString(gameStatus.game.name, 15)}
              </Text>
            </XStack>
            <Separator marginVertical={16} />
            <GamesStatusForm
              initialValues={{
                hours: String(gameStatus.completedIn?.hours),
                minutes: String(gameStatus.completedIn?.minutes),
                seconds: String(gameStatus.completedIn?.seconds),
                platform: String(gameStatus.platform.id),
                score: gameStatus.score,
                review: gameStatus.review,
                status: gameStatus.status,
                platinium: gameStatus.achievementsCompleted,
              }}
              game={gameStatus.game}
              gameStatusId={gameStatus.id}
            />
          </Card.Header>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
