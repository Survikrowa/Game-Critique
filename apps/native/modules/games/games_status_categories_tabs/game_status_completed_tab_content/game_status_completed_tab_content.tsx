import { ChevronRight } from "@tamagui/lucide-icons";
import {
  Card,
  Image,
  ScrollView,
  Separator,
  Tabs,
  View,
  XStack,
} from "tamagui";
import { Text } from "ui/typography/text";

import { truncateString } from "../../../strings/truncate_string";

export const GameStatusCompletedTabContent = () => {
  return (
    <Tabs.Content
      value="completed"
      borderRadius={8}
      elevate
      bordered
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
    >
      <ScrollView>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" width="80%" padding={8}>
            <View maxHeight={50} maxWidth={50} height="100%">
              <Image
                resizeMode="contain"
                source={{
                  uri: "https://howlongtobeat.com/games/27100_Red_Dead_Redemption_2.jpg?width=760",
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text size="medium" weight="bold" color="primary">
              {truncateString("Red Dead Redemption 2", 15)}
            </Text>
          </XStack>

          <ChevronRight />
        </XStack>
        <Separator marginVertical={8} />
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" width="80%" padding={8}>
            <View maxHeight={50} maxWidth={50} height="100%">
              <Image
                resizeMode="contain"
                source={{
                  uri: "https://howlongtobeat.com/games/27100_Red_Dead_Redemption_2.jpg?width=760",
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text size="medium" weight="bold" color="primary">
              {truncateString("Red Dead Redemption 2", 15)}
            </Text>
          </XStack>

          <ChevronRight />
        </XStack>
        <Separator marginVertical={8} />
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" width="80%" padding={8}>
            <View maxHeight={50} maxWidth={50} height="100%">
              <Image
                resizeMode="contain"
                source={{
                  uri: "https://howlongtobeat.com/games/27100_Red_Dead_Redemption_2.jpg?width=760",
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text size="medium" weight="bold" color="primary">
              {truncateString("Red Dead Redemption 2", 15)}
            </Text>
          </XStack>

          <ChevronRight />
        </XStack>
      </ScrollView>
    </Tabs.Content>
  );
};
