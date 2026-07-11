import { useState } from "react";
import { Pressable, View } from "react-native";
import { tva } from "@gluestack-ui/utils/nativewind-utils";

import { useGetUserStats } from "./use_get_user_stats/use_get_user_stats";

import { BarChart } from "@/ui/data-display/bar-chart/bar-chart";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

const tabItemStyle = tva({
  base: "px-3 py-2 min-h-[44px] justify-center items-center",
  variants: {
    active: {
      true: "bg-background-100",
      false: "bg-transparent",
    },
  },
});

const selectData = [
  { name: "Platformy", value: "platforms" },
  { name: "Oceny", value: "ratings" },
  { name: "Rok wydania", value: "release_year" },
];

export const UserStatsScreen = () => {
  const [selectedItem, setSelectedItem] = useState("ratings");
  const userStatsQuery = useGetUserStats({ type: selectedItem });
  const userStats = userStatsQuery.data?.userStats || [];
  return (
    <VStack className="bg-background-0 p-2 rounded-lg">
      <HStack className="justify-center items-center gap-2">
        <Text size="extraLarge" weight="normal" color="primary">
          Obczaj swoje staty
        </Text>
      </HStack>

      <BarChart
        showScrollIndicator
        labelsExtraHeight={30}
        labelWidth={100}
        showValuesAsTopLabel
        horizontal
        topLabelContainerStyle={{ width: 40, marginLeft: -10, marginTop: -10 }}
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
              <Text size="small" weight="normal" color="primary">
                {item.label}
              </Text>
            </VStack>
          );
        }}
      />
      <View className="items-center">
        <HStack className="border border-outline-0 rounded-lg overflow-hidden">
          {selectData.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setSelectedItem(item.value)}
              className={tabItemStyle({ active: selectedItem === item.value })}
            >
              <Text size="small" weight="normal" color="primary">
                {item.name}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </View>
    </VStack>
  );
};
