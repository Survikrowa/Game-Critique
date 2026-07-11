import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "ui/typography/text";

import UndrawSearch from "../assets/undraw_mobile_search.svg";

import { VStack } from "@/ui/layout/vstack/vstack";

type FriendsRequestsEmptyProps = {
  onRefresh: () => void;
  refreshing: boolean;
};

export const FriendsRequestsEmpty = ({
  onRefresh,
  refreshing,
}: FriendsRequestsEmptyProps) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <VStack className="justify-center gap-8">
        <View className="max-h-[400px] max-w-[400px] items-center justify-center">
          <UndrawSearch width="100%" height="100%" />
        </View>
        <VStack className="items-center justify-center gap-2">
          <Text size="extraLarge" weight="semiBold" color="primary">
            Nie bój się zaprosić znajomych.
          </Text>
          <Text size="large" weight="semiBold" color="primary">
            Wróc na poprzedni ekran i zaproś kogoś!
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
