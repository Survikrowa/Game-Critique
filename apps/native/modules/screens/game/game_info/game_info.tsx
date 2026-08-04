import { ScrollView, View } from "react-native";
import { Text } from "ui/typography/text";
import { Calendar, Gamepad2 } from "lucide-react-native";

import { GameChip } from "../game_chip/game_chip";

type GameInfoProps = {
  game: {
    name: string;
    releaseYear?: number | null;
    platforms?: string[];
    genres?: string[];
  };
};

export const GameInfo = ({ game }: GameInfoProps) => {
  return (
    <View style={{ gap: 10 }}>
      <Text size="extraLarge" weight="bold" color="primary">
        {game.name}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 4 }}
      >
        {game.releaseYear && (
          <GameChip
            label={String(game.releaseYear)}
            icon={<Calendar size={12} color="#64748B" />}
          />
        )}
        {game.genres?.map((genre) => <GameChip key={genre} label={genre} />)}
        {game.platforms?.map((platform) => (
          <GameChip
            key={platform}
            label={platform}
            variant="primary"
            icon={<Gamepad2 size={12} color="#3B82F6" />}
          />
        ))}
      </ScrollView>
    </View>
  );
};
