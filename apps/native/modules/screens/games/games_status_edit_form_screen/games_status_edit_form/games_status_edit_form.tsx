import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text } from "ui/typography/text";

import { UserGameStatusQuery } from "../../../user_game_status/use_user_game_status/user_game_status_query.generated";

import { GamesStatusForm } from "@/modules/games_status/games_status_form/games_status_form";
import { truncateString } from "@/modules/strings/truncate_string";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { Card } from "@/ui/panels/card/card";

type GamesStatusEditFormProps = {
  gameStatus: UserGameStatusQuery["userGameStatus"];
};

export const GamesStatusEditForm = ({
  gameStatus,
}: GamesStatusEditFormProps) => {
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 64 }}
          keyboardShouldPersistTaps="handled"
        >
          <Card>
            <HStack className="items-center gap-2 justify-center">
              <Text size="medium" weight="semiBold" color="primary">
                Aktualnie edytujesz:
              </Text>
              <Text size="large" weight="bold" color="primary">
                {truncateString(gameStatus.game.name, 15)}
              </Text>
            </HStack>
            <Separator spacing="md" />
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
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
