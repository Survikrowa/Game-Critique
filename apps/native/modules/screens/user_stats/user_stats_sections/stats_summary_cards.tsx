import { View } from "react-native";

import { Text } from "@/ui/typography/text";

type StatsSummaryCardsProps = {
  totalGames: number;
  totalHours: number;
  averageScore: number | null;
};

export const StatsSummaryCards = ({
  totalGames,
  totalHours,
  averageScore,
}: StatsSummaryCardsProps) => {
  return (
    <View className="flex-row gap-3 px-4">
      <View className="flex-1 items-center rounded-2xl bg-background-50 p-4">
        <Text size="extraLarge" weight="bold" color="primary">
          {totalGames}
        </Text>
        <Text size="small" weight="normal" color="secondary">
          gier
        </Text>
      </View>
      <View className="flex-1 items-center rounded-2xl bg-background-50 p-4">
        <Text size="extraLarge" weight="bold" color="primary">
          {totalHours}h
        </Text>
        <Text size="small" weight="normal" color="secondary">
          godzin
        </Text>
      </View>
      <View className="flex-1 items-center rounded-2xl bg-background-50 p-4">
        <Text size="extraLarge" weight="bold" color="primary">
          {averageScore != null ? averageScore : "—"}
        </Text>
        <Text size="small" weight="normal" color="secondary">
          śr. ocena
        </Text>
      </View>
    </View>
  );
};
