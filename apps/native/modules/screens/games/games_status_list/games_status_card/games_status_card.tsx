import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, View } from "react-native";

import { AchievementCenterGlow } from "./achievement_glow_border/achievement_center_glow";
import { AchievementGlowBorder } from "./achievement_glow_border/achievement_glow_border";
import { getPlatformGlowColor } from "./achievement_glow_border/get_platform_glow_color";
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
  achievementsCompleted?: boolean;
};

type GamesStatusCardProps = {
  item: GamesStatusCardItem;
  onPress: () => void;
  onBadgePress?: () => void;
  onMorePress?: () => void;
};

export const GamesStatusCard = ({
  item,
  onPress,
  onBadgePress,
  onMorePress,
}: GamesStatusCardProps) => {
  const visual = getGameStatusVisual(item.status);
  const badgeContent = visual.icon(visual.color, 16);
  const glowColor = item.achievementsCompleted
    ? getPlatformGlowColor(item.platform)
    : null;

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
        {glowColor ? <AchievementCenterGlow color={glowColor} /> : null}
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
        {onMorePress ? (
          <Pressable
            onPress={onMorePress}
            className="absolute top-2 right-2 w-9 h-9 rounded-full items-center justify-center bg-background-0/90"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View className="w-5 h-5 items-center justify-center">
              <View className="w-1 h-1 rounded-full bg-typography-400 mb-[2px]" />
              <View className="w-1 h-1 rounded-full bg-typography-400 mb-[2px]" />
              <View className="w-1 h-1 rounded-full bg-typography-400" />
            </View>
          </Pressable>
        ) : null}
      </View>
      {glowColor ? <AchievementGlowBorder color={glowColor} /> : null}
    </Pressable>
  );
};
