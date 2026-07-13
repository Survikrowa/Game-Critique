import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, View } from "react-native";

import { GameStatus } from "../../../../../__generated__/types";
import { getGameStatusVisual } from "../games_status_list_item/games_status_visuals";

import { truncateString } from "@/modules/strings/truncate_string";
import { Text } from "@/ui/typography/text";

export type GamesStatusCardItem = {
  title: string;
  platform: string;
  status: GameStatus;
  score: string;
  cover: string;
};

type GamesStatusCardProps = {
  item: GamesStatusCardItem;
  onPress: () => void;
  onBadgePress?: () => void;
};

export const GamesStatusCard = ({
  item,
  onPress,
  onBadgePress,
}: GamesStatusCardProps) => {
  const visual = getGameStatusVisual(item.status);
  const badgeContent = visual.icon(visual.color, 16);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.06)" }}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      <View className="w-[112px] h-[142px] rounded-xl overflow-hidden bg-background-100">
        <Image
          source={{ uri: item.cover }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.65)", "rgba(0,0,0,0.95)"]}
          locations={[0, 0.45, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 92,
          }}
        />
        <View className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 gap-0.5">
          <Text size="small" weight="bold" color="white">
            {truncateString(item.title, 14)}
          </Text>
          <Text size="small" weight="normal" color="secondary">
            {item.platform}
          </Text>
          {item.score && item.score !== "0" && (
            <Text size="small" weight="bold" color="secondary">
              Ocena: {item.score.replace("-", ",")}
            </Text>
          )}
        </View>
        {onBadgePress ? (
          <Pressable
            onPress={onBadgePress}
            className="absolute top-2 left-2 w-8 h-8 rounded-full items-center justify-center bg-background-0/90"
          >
            {badgeContent}
          </Pressable>
        ) : (
          <View className="absolute top-2 left-2 w-8 h-8 rounded-full items-center justify-center bg-background-0/90">
            {badgeContent}
          </View>
        )}
      </View>
    </Pressable>
  );
};
