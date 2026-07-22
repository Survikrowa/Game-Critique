import { Clock } from "lucide-react-native";
import { View } from "react-native";

import { pluralizePolish } from "@/modules/strings/pluralize";
import { Text } from "@/ui/typography/text";

type GameStatusCompletionTimeProps = {
  hours: number | null | undefined;
  minutes: number | null | undefined;
  seconds: number | null | undefined;
};

export const GameStatusCompletionTime = ({
  hours,
  minutes,
  seconds,
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
          {hours} {pluralizePolish(hours || 0, "godzina", "godziny", "godzin")},{" "}
          {minutes} {pluralizePolish(minutes || 0, "minuta", "minuty", "minut")}{" "}
          i {seconds}{" "}
          {pluralizePolish(seconds || 0, "sekunda", "sekundy", "sekund")}
        </Text>
      </View>
    </View>
  );
};
