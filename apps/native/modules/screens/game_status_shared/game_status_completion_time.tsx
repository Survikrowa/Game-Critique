import { Clock } from "lucide-react-native";
import { View } from "react-native";

import { pluralizePolish } from "@/modules/strings/pluralize";
import { Text } from "@/ui/typography/text";

type GameStatusCompletionTimeProps = {
  hours: number | null | undefined;
  minutes: number | null | undefined;
};

const HOURS_PLURAL = ["godzina", "godziny", "godzin"] as const;
const MINUTES_PLURAL = ["minuta", "minuty", "minut"] as const;

export const GameStatusCompletionTime = ({
  hours,
  minutes,
}: GameStatusCompletionTimeProps) => {
  return (
    <View className="mx-4 rounded-2xl bg-background-50 p-4">
      <View className="flex-row items-center gap-2">
        <Clock size={20} color="#3B82F6" />
        <Text size="large" weight="bold" color="primary">
          Czas ukończenia
        </Text>
      </View>
      <View className="mt-2">
        <Text size="medium" weight="normal" color="primary">
          {hours} {pluralizePolish(hours || 0, ...HOURS_PLURAL)}, {minutes}{" "}
          {pluralizePolish(minutes || 0, ...MINUTES_PLURAL)}
        </Text>
      </View>
    </View>
  );
};
