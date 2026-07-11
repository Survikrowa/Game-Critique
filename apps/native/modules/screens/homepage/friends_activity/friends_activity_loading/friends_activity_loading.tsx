import { ActivityIndicator } from "react-native";

import { Text } from "ui/typography/text";

import { HStack } from "@/ui/layout/hstack/hstack";

export const FriendsActivityLoading = () => {
  return (
    <HStack style={{ alignItems: "center", gap: 8 }}>
      <Text size="medium" weight="normal" color="primary">
        Ładujemy aktywność twoich znajomych...
      </Text>
      <ActivityIndicator size="large" color="#3B82F6" />
    </HStack>
  );
};
