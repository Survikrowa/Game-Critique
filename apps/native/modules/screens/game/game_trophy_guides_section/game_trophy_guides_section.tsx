import { View } from "react-native";
import { Text } from "ui/typography/text";
import { ExternalLink } from "lucide-react-native";

export const GameTrophyGuidesSection = () => (
  <View style={{ gap: 8 }}>
    <View className="flex-row items-center justify-between">
      <Text size="small" weight="semiBold" color="secondary">
        Poradniki do trofeów
      </Text>
      <View className="bg-background-100 rounded-full px-2 py-0.5">
        <Text size="extraSmall" weight="bold" color="secondary">
          Wkrótce
        </Text>
      </View>
    </View>
    <View className="bg-background-50 rounded-2xl px-4 py-4 flex-row items-center justify-between">
      <View style={{ gap: 2 }}>
        <Text size="small" weight="semiBold" color="primary">
          Linki do poradników
        </Text>
        <Text size="extraSmall" weight="normal" color="secondary">
          PS5, Xbox, PC i więcej
        </Text>
      </View>
      <ExternalLink size={18} color="#475569" />
    </View>
  </View>
);
