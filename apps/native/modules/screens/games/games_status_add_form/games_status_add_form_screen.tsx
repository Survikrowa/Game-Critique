import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Text } from "ui/typography/text";

import { GamesStatusAddForm } from "./games_status_add_form";
import { truncateString } from "../../../strings/truncate_string";
import { useGetGameInfo } from "../../game/use_get_game_info/use_get_game_info";

import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { Card } from "@/ui/panels/card/card";

export const GamesStatusAddFormScreen = () => {
  const { hltb_id } = useLocalSearchParams<{ hltb_id: string }>();
  const gameQuery = useGetGameInfo(hltb_id);
  if (!hltb_id || !gameQuery.data) {
    return null;
  }
  if (gameQuery.loading) {
    return <ActivityIndicator size="large" color="#3B82F6" />;
  }
  const game = gameQuery.data.game;
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
                Aktualnie dodajesz:
              </Text>
              <Text size="large" weight="bold" color="primary">
                {truncateString(game.name, 15)}
              </Text>
            </HStack>
            <Separator spacing="md" />
            <GamesStatusAddForm game={game} />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
