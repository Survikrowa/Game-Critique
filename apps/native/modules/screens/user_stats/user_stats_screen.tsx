import { useState } from "react";
import { Separator, View, Group, Button } from "tamagui";

import { useGetUserStats } from "./use_get_user_stats/use_get_user_stats";

import { BarChart } from "@/ui/data-display/bar-chart/bar-chart";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

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
    <VStack className="bg-background-0 p-2 rounded-lg">
      <HStack className="justify-center items-center gap-2">
        <Text size="extraLarge" weight="normal" color="white">
          Obczaj swoje staty
        </Text>
      </HStack>

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
        renderTooltip={(item: { label: string; value: number }) => {
          return (
            <VStack className="mb-2.5 bg-black border-white border pv-1 ph-1 rounded-sm w-full">
              <Text size="small" weight="normal" color="white">
                {item.label}
              </Text>
            </VStack>
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
    </VStack>
  );
};
