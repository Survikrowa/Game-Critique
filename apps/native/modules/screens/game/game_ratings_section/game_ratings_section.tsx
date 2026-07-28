import { View } from "react-native";

import { RatingCard } from "./rating_card/rating_card";

import { useFetchGameRatings } from "@/modules/game_ratings/use_fetch_game_ratings/use_fetch_game_ratings";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Card } from "@/ui/panels/card/card";
import { Text } from "@/ui/typography/text";

type GameRatingData = {
  aggregatedRating?: number | null;
  aggregatedCount?: number | null;
  igdbRating?: number | null;
  igdbRatingCount?: number | null;
  igdbUrl?: string | null;
};

type GameRatingsSectionProps = {
  gameRating: GameRatingData | null | undefined;
  hltbId: number | undefined;
  onDataFetched: () => void;
};

export const GameRatingsSection = ({
  gameRating,
  hltbId,
  onDataFetched,
}: GameRatingsSectionProps) => {
  const { fetch, loading } = useFetchGameRatings();

  const handleFetch = async () => {
    if (!hltbId) return;
    await fetch({ variables: { hltbId } });
    onDataFetched();
  };

  if (loading) {
    return (
      <Card className="p-4">
        <VStack className="gap-3">
          <Skeleton style={{ width: 160, height: 20 }} />
          <Skeleton style={{ width: "100%", height: 80 }} />
        </VStack>
      </Card>
    );
  }

  if (!gameRating) {
    return (
      <Card className="p-4">
        <VStack className="items-center gap-3">
          <Text size="medium" weight="normal" color="secondary">
            Brak danych o ocenach
          </Text>
          <Pressable
            onPress={handleFetch}
            className="min-h-[44px] items-center justify-center rounded-full bg-primary-500 px-4"
          >
            <Text size="medium" weight="bold" color="white">
              Pobierz oceny
            </Text>
          </Pressable>
        </VStack>
      </Card>
    );
  }

  return (
    <View style={{ gap: 8 }}>
      <Text size="small" weight="semiBold" color="secondary">
        Oceny graczy
      </Text>
      <View className="flex-row gap-3">
        <RatingCard
          source="metacritic"
          score={gameRating.aggregatedRating}
          count={gameRating.aggregatedCount}
          igdbUrl={gameRating.igdbUrl}
        />
        <RatingCard
          source="igdb"
          score={gameRating.igdbRating}
          count={gameRating.igdbRatingCount}
          igdbUrl={gameRating.igdbUrl}
        />
      </View>
    </View>
  );
};
