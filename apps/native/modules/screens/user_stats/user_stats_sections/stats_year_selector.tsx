import { Pressable, View } from "react-native";

import { Text } from "@/ui/typography/text";

type StatsYearSelectorProps = {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  years: number[];
};

export const StatsYearSelector = ({
  selectedYear,
  onYearChange,
  years,
}: StatsYearSelectorProps) => {
  const allActive = selectedYear === null;
  return (
    <View className="flex-row gap-2 px-4">
      <Pressable
        onPress={() => onYearChange(null)}
        className={`min-h-[44px] rounded-full px-4 py-4 ${
          allActive ? "bg-primary-500" : "bg-background-100"
        }`}
      >
        <Text
          size="medium"
          weight={allActive ? "bold" : "normal"}
          color={allActive ? "white" : "primary"}
        >
          Wszystko
        </Text>
      </Pressable>
      {years.map((year) => {
        const isActive = year === selectedYear;
        return (
          <Pressable
            key={year}
            onPress={() => onYearChange(year)}
            className={`min-h-[44px] rounded-full px-4 py-4 ${
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
