import { router } from "expo-router";
import { Star, Users } from "lucide-react-native";
import { Pressable } from "react-native";

import { Text } from "@/ui/typography/text";

type RatingCardProps = {
  source: "metacritic" | "igdb";
  score: number | null | undefined;
  count: number | null | undefined;
  igdbUrl: string | null | undefined;
};

export const RatingCard = ({
  source,
  score,
  count,
  igdbUrl,
}: RatingCardProps) => {
  const isMetacritic = source === "metacritic";
  const accentColor = isMetacritic ? "#F59E0B" : "#3B82F6";

  const handlePress = () => {
    if (igdbUrl) {
      router.push({ pathname: "/webview", params: { url: igdbUrl } });
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={!igdbUrl}
      className="flex-1 items-center rounded-2xl bg-background-50 py-4"
      style={{ gap: 4 }}
    >
      {isMetacritic ? (
        <Star size={20} color={accentColor} />
      ) : (
        <Users size={20} color={accentColor} />
      )}
      <Text size="small" weight="normal" color="secondary">
        {isMetacritic ? "Metacritic" : "IGDB"}
      </Text>
      {score != null ? (
        <Text size="large" weight="bold" color="primary">
          {Math.round(score)}
        </Text>
      ) : (
        <Text size="large" weight="bold" color="secondary">
          —
        </Text>
      )}
      {score != null && (
        <Text size="small" weight="normal" color="secondary">
          / 100
        </Text>
      )}
      {count != null && count > 0 && (
        <Text size="small" weight="normal" color="secondary">
          {count} {isMetacritic ? "recenzji" : "głosów"}
        </Text>
      )}
    </Pressable>
  );
};
