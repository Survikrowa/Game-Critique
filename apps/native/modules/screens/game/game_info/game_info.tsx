import { Card } from "tamagui";
import { Text } from "ui/typography/text";

import { HStack } from "@/ui/layout/hstack/hstack";

type GameInfoProps = {
  game: {
    name: string;
    releaseYear?: number | null;
    platforms?: string[];
  };
};

export const GameInfo = ({ game }: GameInfoProps) => {
  return (
    <Card backgroundColor="$color.container" width="100%">
      <Card.Header>
        <Text size="extraLarge" weight="bold" color="primary">
          {game.name}
        </Text>
        <HStack className="mt-1 flex-wrap">
          {game.releaseYear && (
            <Text size="medium" weight="normal" color="secondary">
              {game.releaseYear}
            </Text>
          )}
          {game.releaseYear && game.platforms && (
            <Text size="medium" weight="normal" color="secondary">
              {" - "}
            </Text>
          )}
          {game.platforms &&
            game.platforms.map((platform, index) => (
              <Text
                key={platform}
                size="medium"
                weight="bold"
                color="secondary"
              >
                {index + 1 !== game.platforms?.length
                  ? `${platform}, `
                  : platform}
              </Text>
            ))}
        </HStack>
      </Card.Header>
    </Card>
  );
};
