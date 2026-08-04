import { View } from "react-native";

import { Text } from "@/ui/typography/text";

type StatsBacklogProgressProps = {
  completed: number;
  added: number;
  ratio: number;
};

export const StatsBacklogProgress = ({
  completed,
  added,
  ratio,
}: StatsBacklogProgressProps) => {
  const percentage = Math.round(ratio * 100);

  return (
    <View className="mx-4 rounded-2xl bg-background-50 p-4">
      <Text size="large" weight="bold" color="primary">
        Backlog progress
      </Text>
      <View className="mt-2 flex-row justify-between">
        <Text size="medium" weight="normal" color="primary">
          Ukończone: {completed}
        </Text>
        <Text size="medium" weight="normal" color="secondary">
          Dodane: {added}
        </Text>
      </View>
      <View className="mt-2 h-3 w-full overflow-hidden rounded-full bg-background-100">
        <View
          style={{ width: `${Math.min(percentage, 100)}%` }}
          className="h-full rounded-full bg-success-500"
        />
      </View>
      <View className="mt-1">
        <Text size="small" weight="normal" color="secondary">
          {percentage}% backlogu ukończone
        </Text>
      </View>
    </View>
  );
};
