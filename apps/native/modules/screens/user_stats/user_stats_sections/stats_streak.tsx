import { Flame } from "lucide-react-native";
import { View } from "react-native";

import { pluralizePolish } from "@/modules/strings/pluralize";
import { Text } from "@/ui/typography/text";

type StatsStreakProps = {
  currentStreak: number;
  longestStreak: number;
};

export const StatsStreak = ({
  currentStreak,
  longestStreak,
}: StatsStreakProps) => {
  return (
    <View className="mx-4 flex-row items-center gap-3 rounded-2xl bg-background-50 p-4">
      <Flame size={28} color="#F59E0B" />
      <View className="flex-1">
        <Text size="large" weight="bold" color="primary">
          {currentStreak}{" "}
          {pluralizePolish(currentStreak, "tydzień", "tygodnie", "tygodni")} z
          rzędu
        </Text>
        <Text size="small" weight="normal" color="secondary">
          Najdłuższy: {longestStreak}{" "}
          {pluralizePolish(longestStreak, "tydzień", "tygodnie", "tygodni")}
        </Text>
      </View>
    </View>
  );
};
