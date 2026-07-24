import { Star } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "ui/typography/text";

export const GameRatingsSection = () => (
  <View style={{ gap: 8 }}>
    <View className="flex-row items-center justify-between">
      <Text size="small" weight="semiBold" color="secondary">
        Oceny graczy
      </Text>
      <View className="rounded-full bg-background-100 px-2 py-0.5">
        <Text size="small" weight="bold" color="secondary">
          Wkrótce
        </Text>
      </View>
    </View>
    <View className="flex-row gap-3">
      <View
        className="flex-1 items-center rounded-2xl bg-background-50 py-4"
        style={{ gap: 4 }}
      >
        <Star size={20} color="#F59E0B" />
        <Text size="small" weight="normal" color="secondary">
          Metacritic
        </Text>
        <Text size="large" weight="bold" color="secondary">
          —
        </Text>
      </View>
      <View
        className="flex-1 items-center rounded-2xl bg-background-50 py-4"
        style={{ gap: 4 }}
      >
        <Star size={20} color="#3B82F6" />
        <Text size="small" weight="normal" color="secondary">
          OpenCritic
        </Text>
        <Text size="large" weight="bold" color="secondary">
          —
        </Text>
      </View>
    </View>
  </View>
);
