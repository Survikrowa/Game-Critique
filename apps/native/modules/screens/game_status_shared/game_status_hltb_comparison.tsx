import { Clock } from "lucide-react-native";
import { View } from "react-native";

import { Text } from "@/ui/typography/text";

type GameStatusHLTBComparisonProps = {
  myHours: number | null;
  myMinutes: number | null;
  mainStoryHours: number | null;
  completionistHours: number | null;
};

const ROUNDING_PRECISION = 10;
const HOURS_PER_MINUTE = 60;

export const GameStatusHLTBComparison = ({
  myHours,
  myMinutes,
  mainStoryHours,
  completionistHours,
}: GameStatusHLTBComparisonProps) => {
  if (myHours == null && myMinutes == null) return null;
  if (mainStoryHours == null && completionistHours == null) return null;

  const myTotalHours = (myHours || 0) + (myMinutes || 0) / HOURS_PER_MINUTE;
  const diff =
    mainStoryHours != null
      ? Math.round((myTotalHours - mainStoryHours) * ROUNDING_PRECISION) /
        ROUNDING_PRECISION
      : null;

  return (
    <View className="mx-4 rounded-2xl bg-background-50 p-4">
      <View className="flex-row items-center gap-2">
        <Clock size={20} color="#3B82F6" />
        <Text size="large" weight="bold" color="primary">
          Twój czas vs HLTB
        </Text>
      </View>
      <View className="mt-2 gap-1">
        <Text size="medium" weight="semiBold" color="primary">
          Twój czas: {myHours}h {myMinutes}m
        </Text>
        {mainStoryHours != null && (
          <Text size="medium" weight="normal" color="secondary">
            HLTB Main Story: {mainStoryHours}h
          </Text>
        )}
        {completionistHours != null && (
          <Text size="medium" weight="normal" color="secondary">
            HLTB Completionist: {completionistHours}h
          </Text>
        )}
        {diff != null && (
          <View className="mt-1">
            <Text size="small" weight="normal" color="active">
              {diff > 0
                ? `Grałeś o ${diff}h dłużej niż przeciętny gracz (main story)`
                : `Grałeś o ${Math.abs(
                    diff,
                  )}h krócej niż przeciętny gracz (main story)`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
