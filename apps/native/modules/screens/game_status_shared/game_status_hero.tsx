import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

import { Text } from "@/ui/typography/text";

type GameStatusHeroProps = {
  coverUrl?: string;
  gameName: string;
  statusBadge: {
    label: string;
    color: "success" | "primary" | "warning" | "background";
  };
};

const BADGE_COLOR_CLASS: Record<string, string> = {
  success: "bg-success-500",
  primary: "bg-primary-500",
  warning: "bg-warning-500",
  background: "bg-background-500",
};

export const GameStatusHero = ({
  coverUrl,
  gameName,
  statusBadge,
}: GameStatusHeroProps) => {
  return (
    <View style={{ height: 260, width: "100%" }}>
      <Image
        source={{ uri: coverUrl }}
        resizeMode="cover"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]}
        locations={[0.35, 0.7, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View className="absolute bottom-4 left-4 right-4">
        <Text size="extraLarge" weight="bold" color="white">
          {gameName}
        </Text>
        <View className="mt-2 flex-row">
          <View
            className={`rounded-full px-3 py-1 ${
              BADGE_COLOR_CLASS[statusBadge.color]
            }`}
          >
            <Text size="small" weight="semiBold" color="white">
              {statusBadge.label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
