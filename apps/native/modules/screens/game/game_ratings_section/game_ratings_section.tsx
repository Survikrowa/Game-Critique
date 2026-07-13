import { View } from "react-native";
import { Text } from "ui/typography/text";
import { Star } from "lucide-react-native";

export const GameRatingsSection = () => (
  <View style={{ gap: 8 }}>
    <View className="flex-row items-center justify-between">
      <Text size="small" weight="semiBold" color="secondary">
        Oceny graczy
      </Text>
      <View className="bg-background-100 rounded-full px-2 py-0.5">
        <Text size="extraSmall" weight="bold" color="secondary">
          Wkrótce
        </Text>
      </View>
    </View>
    <View className="flex-row gap-3">
      <View
        className="flex-1 items-center bg-background-50 rounded-2xl py-4"
        style={{ gap: 4 }}
      >
        <Star size={20} color="#F59E0B" />
        <Text size="extraSmall" weight="normal" color="secondary">
          Metacritic
        </Text>
        <Text size="large" weight="bold" color="secondary">
          —
        </Text>
      </View>
      <View
        className="flex-1 items-center bg-background-50 rounded-2xl py-4"
        style={{ gap: 4 }}
      >
        <Star size={20} color="#3B82F6" />
        <Text size="extraSmall" weight="normal" color="secondary">
          OpenCritic
        </Text>
        <Text size="large" weight="bold" color="secondary">
          —
        </Text>
      </View>
    </View>
  </View>
);
