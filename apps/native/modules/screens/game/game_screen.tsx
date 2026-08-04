import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DoesItPlaySection } from "./does_it_play_section/does_it_play_section";
import { GameCompletionTime } from "./game_completion_time/game_completion_time";
import { GameImage } from "./game_image/game_image";
import { GameInfo } from "./game_info/game_info";
import { GamePreparingInfo } from "./game_preparing_info/game_preparing_info";
import { GameRatingsSection } from "./game_ratings_section/game_ratings_section";
import { GameSkeleton } from "./game_skeleton/game_skeleton";
import { GameStatusExistingAction } from "./game_status_existing_action/game_status_existing_action";
import { GameStatusQuickActions } from "./game_status_quick_actions/game_status_quick_actions";
import { GameTrophyGuidesSection } from "./game_trophy_guides_section/game_trophy_guides_section";
import { useGetGameInfo } from "./use_get_game_info/use_get_game_info";
import { useMyGameStatusForGame } from "./use_my_game_status_for_game/use_my_game_status_for_game";

export const GameScreen = () => {
  const { game_id } = useLocalSearchParams<{ game_id: string }>();
  const gameQuery = useGetGameInfo(game_id);
  const router = useRouter();
  const myGameStatusQuery = useMyGameStatusForGame(gameQuery.data?.game.id);

  if (gameQuery.error) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-background-0"
        edges={["top"]}
      >
        <GamePreparingInfo onRefreshClick={() => gameQuery.refetch()} />
      </SafeAreaView>
    );
  }

  if (gameQuery.loading || !gameQuery.data || !game_id) {
    return <GameSkeleton />;
  }

  const game = gameQuery.data.game;

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

          {myGameStatusQuery.loading ? (
            <View className="h-[44px]" />
          ) : myGameStatusQuery.data?.myGameStatusForGame ? (
            <GameStatusExistingAction
              status={myGameStatusQuery.data.myGameStatusForGame.status}
            />
          ) : (
            <GameStatusQuickActions
              game={{ id: game.id, platforms: game.platforms }}
              onSuccess={() => myGameStatusQuery.refetch()}
            />
          )}

          <GameCompletionTime
            main={game.completionTime?.main}
            completionist={game.completionTime?.completionist}
            mainExtra={game.completionTime?.mainExtra}
          />

          <GameRatingsSection
            gameRating={game.gameRating}
            hltbId={game.hltbId}
            onDataFetched={gameQuery.refetch}
          />

          <GameTrophyGuidesSection />

          <DoesItPlaySection
            entries={game.gameMetadata?.physicalMedia}
            hltbId={game.hltbId}
            onDataFetched={gameQuery.refetch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
