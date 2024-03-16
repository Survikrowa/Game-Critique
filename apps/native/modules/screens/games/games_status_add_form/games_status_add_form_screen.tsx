import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { Card, Spinner, XStack, Separator, ScrollView } from "tamagui";
import { Text } from "ui/typography/text";

import { GamesStatusAddForm } from "./games_status_add_form";
import { truncateString } from "../../../strings/truncate_string";
import { useGetGameInfo } from "../../game/use_get_game_info/use_get_game_info";

export const GamesStatusAddFormScreen = () => {
  const { hltb_id } = useLocalSearchParams<{ hltb_id: string }>();
  const gameQuery = useGetGameInfo(hltb_id);
  if (!hltb_id || !gameQuery.data) {
    return null;
  }
  if (gameQuery.loading) {
    return <Spinner size="large" />;
  }
  const game = gameQuery.data.game;
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
                Aktualnie dodajesz:
              </Text>
              <Text size="large" weight="bold" color="primary">
                {truncateString(game.name, 15)}
              </Text>
            </XStack>
            <Separator marginVertical={16} />
            <GamesStatusAddForm game={game} />
          </Card.Header>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
