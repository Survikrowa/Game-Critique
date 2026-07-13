import { View } from "react-native";
import { Text } from "ui/typography/text";
import { BookOpen, Star, Trophy } from "lucide-react-native";

import { timeToRelative } from "../../../dates/time_to_relative";
import { StatColumn } from "../game_stat_column/game_stat_column";

type GameCompletionTimeProps = {
  main?: number;
  mainExtra?: number;
  completionist?: number;
};

export const GameCompletionTime = ({
  main = 0,
  mainExtra = 0,
  completionist = 0,
}: GameCompletionTimeProps) => {
  return (
    <View style={{ gap: 8 }}>
      <Text size="small" weight="semiBold" color="secondary">
        Czas ukończenia
      </Text>
      <View className="flex-row" style={{ gap: 8 }}>
        <StatColumn
          icon={<BookOpen size={18} color="#3B82F6" />}
          label="Fabuła"
          value={timeToRelative(main)}
        />
        <StatColumn
          icon={<Star size={18} color="#F59E0B" />}
          label="Fabuła + extra"
          value={timeToRelative(mainExtra)}
        />
        <StatColumn
          icon={<Trophy size={18} color="#10B981" />}
          label="100%"
          value={timeToRelative(completionist)}
        />
      </View>
    </View>
  );
};
