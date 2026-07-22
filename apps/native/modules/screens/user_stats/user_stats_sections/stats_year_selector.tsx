import { Pressable, View } from "react-native";

import { Text } from "@/ui/typography/text";

type StatsYearSelectorProps = {
  selectedYear: number;
  onYearChange: (year: number) => void;
  years: number[];
};

export const StatsYearSelector = ({
  selectedYear,
  onYearChange,
  years,
}: StatsYearSelectorProps) => {
  return (
    <View className="flex-row gap-2 px-4">
      {years.map((year) => {
        const isActive = year === selectedYear;
        return (
          <Pressable
            key={year}
            onPress={() => onYearChange(year)}
            className={`min-h-[44px] rounded-full px-4 py-2 ${
              isActive ? "bg-primary-500" : "bg-background-100"
            }`}
          >
            <Text
              size="medium"
              weight={isActive ? "bold" : "normal"}
              color={isActive ? "white" : "primary"}
            >
              {year}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
