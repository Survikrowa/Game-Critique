import { RefreshControl } from "react-native-gesture-handler";
import { ScrollView, View, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import UndrawSearch from "../assets/undraw_mobile_search.svg";

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
      <YStack justifyContent="center" gap={32}>
        <View
          maxHeight={400}
          maxWidth={400}
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <UndrawSearch width="100%" height="100%" />
        </View>
        <YStack alignItems="center" justifyContent="center" gap={8}>
          <Text size="extraLarge" weight="semiBold" color="primary">
            Nie bój się zaprosić znajomych.
          </Text>
          <Text size="large" weight="semiBold" color="primary">
            Wróc na poprzedni ekran i zaproś kogoś!
          </Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
};
