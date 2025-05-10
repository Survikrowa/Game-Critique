import { useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { Separator, View, YStack, XStack, Group, Button } from "tamagui";

import { useGetUserStats } from "./use_get_user_stats/use_get_user_stats";
import { Text } from "../../../ui/typography/text";

const selectData = [
  {
    name: "Platformy",
    value: "platforms",
  },
  {
    name: "Oceny",
    value: "ratings",
  },
  {
    name: "Rok wydania",
    value: "release_year",
  },
];

export const UserStatsScreen = () => {
  const [selectedItem, setSelectedItem] = useState("ratings");
  const userStatsQuery = useGetUserStats({
    type: selectedItem,
  });
  const userStats = userStatsQuery.data?.userStats || [];
  return (
    <YStack backgroundColor="$color.container" padding={8} borderRadius={8}>
      <XStack justifyContent="center" alignItems="center" gap={8}>
        <Text size="extraLarge" weight="normal" color="white">
          Obczaj swoje staty
        </Text>
      </XStack>

      <BarChart
        showScrollIndicator
        labelsExtraHeight={30}
        labelWidth={100}
        showValuesAsTopLabel
        horizontal
        topLabelContainerStyle={{
          width: 40,
          marginLeft: -10,
          marginTop: -10,
        }}
        topLabelTextStyle={{
          color: "white",
          fontSize: 12,
          fontWeight: "normal",
        }}
        data={userStats || []}
        barWidth={18}
        height={200}
        width={240}
        showGradient
        noOfSections={4}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          alignSelf: "flex-start",
          marginRight: 40,
          marginTop: -44,
          color: "white",
        }}
        renderTooltip={(item: { label: string; value: string }) => {
          return (
            <YStack
              style={{
                marginBottom: 10,
                backgroundColor: "black",
                borderColor: "white",
                borderWidth: 1,
                paddingHorizontal: 4,
                paddingVertical: 4,
                borderRadius: 4,
                width: "100%",
              }}
            >
              <Text size="small" weight="normal" color="white">
                {item.label}
              </Text>
            </YStack>
          );
        }}
      />
      <View alignItems="center">
        <Group
          borderWidth={1}
          borderColor="white"
          orientation="horizontal"
          separator={<Separator vertical />}
        >
          {selectData.map((item) => (
            <Group.Item key={item.value}>
              <Button
                onPress={() => {
                  setSelectedItem(item.value);
                }}
                backgroundColor={
                  selectedItem === item.value ? "gray" : "transparent"
                }
                color="white"
              >
                {item.name}
              </Button>
            </Group.Item>
          ))}
        </Group>
      </View>
    </YStack>
  );
};
