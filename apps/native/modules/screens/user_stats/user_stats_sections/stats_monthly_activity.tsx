import { View } from "react-native";

import { Text } from "@/ui/typography/text";

type MonthlyData = {
  month: number;
  gamesCompleted: number;
  hoursPlayed: number;
};

type StatsMonthlyActivityProps = {
  data: MonthlyData[];
};

const MONTH_LABELS = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];
const BAR_HEIGHT = 80;

export const StatsMonthlyActivity = ({ data }: StatsMonthlyActivityProps) => {
  const maxGames = Math.max(...data.map((d) => d.gamesCompleted), 1);

  return (
    <View className="mx-4 rounded-2xl bg-background-50 p-4">
      <Text size="large" weight="bold" color="primary">
        Aktywność miesięczna
      </Text>
      <View className="mt-3 flex-row items-end justify-between">
        {data.map((d) => {
          const barHeight = (d.gamesCompleted / maxGames) * BAR_HEIGHT;
          return (
            <View key={d.month} className="flex-1 items-center gap-1">
              <Text size="small" weight="normal" color="secondary">
                {d.gamesCompleted}
              </Text>
              <View
                style={{ height: Math.max(barHeight, 2), width: 8 }}
                className="rounded-full bg-primary-500"
              />
              <Text size="small" weight="normal" color="secondary">
                {MONTH_LABELS[d.month - 1]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
