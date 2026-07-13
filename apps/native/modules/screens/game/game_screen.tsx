import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameCompletionTime } from "./game_completion_time/game_completion_time";
import { GameImage } from "./game_image/game_image";
import { GameInfo } from "./game_info/game_info";
import { GameRatingsSection } from "./game_ratings_section/game_ratings_section";
import { GameSkeleton } from "./game_skeleton/game_skeleton";
import { GameTabs } from "./game_tabs/game_tabs";
import { GameTrophyGuidesSection } from "./game_trophy_guides_section/game_trophy_guides_section";
import { useGetGameInfo } from "./use_get_game_info/use_get_game_info";

import { ErrorState } from "@/ui/feedback/error_state/error_state";

type GameScreenProps = {
  redirect: {
    addToGameStatusUrl: string;
  };
};

export const GameScreen = ({ redirect }: GameScreenProps) => {
  const { game_id } = useLocalSearchParams<{ game_id: string }>();
  const gameQuery = useGetGameInfo(game_id);

  if (gameQuery.error) {
    return (
      <ErrorState
        title="Nie udało się załadować gry"
        description="Gra może być aktualnie pobierana do naszej bazy."
        onRetry={() => gameQuery.refetch()}
      />
    );
  }

  if (gameQuery.loading || !gameQuery.data || !game_id) {
    return <GameSkeleton />;
  }

  const game = gameQuery.data.game;
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-0" edges={["top"]}>
      <View className="px-4 py-2">
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "rgba(255,255,255,0.08)",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={22} color="#94A3B8" strokeWidth={2.5} />
        </Pressable>
      </View>
      <ScrollView
        className="flex-1"
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <GameImage uri={game.cover?.mediumUrl} />

        <View className="px-4 pb-10" style={{ gap: 20, marginTop: -2 }}>
          <GameInfo
            game={{
              name: game.name,
              releaseYear: game.releases?.date,
              platforms: game.platforms.map((p) => p.name),
              genres: game.genres.map((g) => g.name),
            }}
          />

          <GameTabs
            game={{ name: game.name, hltbId: game_id }}
            redirect={redirect}
          />

          <GameCompletionTime
            main={game.completionTime?.main}
            completionist={game.completionTime?.completionist}
            mainExtra={game.completionTime?.mainExtra}
          />

          <GameRatingsSection />

          <GameTrophyGuidesSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
