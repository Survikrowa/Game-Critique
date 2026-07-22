import { View } from "react-native";

import { Text } from "@/ui/typography/text";

export const FriendStatsTab = () => {
  return (
    <View className="items-center justify-center px-4 pt-20">
      <Text size="large" weight="bold" color="primary">
        Statystyki
      </Text>
      <View>
        <Text size="medium" weight="normal" color="secondary">
          Statystyki wkrótce dostępne
        </Text>
      </View>
    </View>
  );
};
