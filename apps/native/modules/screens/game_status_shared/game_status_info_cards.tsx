import { Gamepad2, Star } from "lucide-react-native";
import { View } from "react-native";

import { getPlatformColor } from "./get_platform_color";
import { parseScore } from "./parse_score";

import { Text } from "@/ui/typography/text";

type GameStatusInfoCardsProps = {
  platformName: string;
  platformLabel: string;
  score?: string | null;
};

export const GameStatusInfoCards = ({
  platformName,
  platformLabel,
  score,
}: GameStatusInfoCardsProps) => {
  return (
    <View className="flex-row gap-3 px-4">
      <View className="flex-1 rounded-2xl bg-background-50 p-4">
        <Gamepad2 size={20} color="#64748B" />
        <View className="mt-2">
          <Text size="small" weight="normal" color="secondary">
            {platformLabel}
          </Text>
        </View>
        <Text
          size="medium"
          weight="semiBold"
          color={getPlatformColor(platformName)}
        >
          {platformName}
        </Text>
      </View>
      {score && (
        <View className="flex-1 rounded-2xl bg-background-50 p-4">
          <Star size={20} color="#F59E0B" />
          <View className="mt-2">
            <Text size="small" weight="normal" color="secondary">
              Moja ocena
            </Text>
          </View>
          <Text size="medium" weight="semiBold" color="primary">
            {parseScore(score)}/10
          </Text>
        </View>
      )}
    </View>
  );
};
