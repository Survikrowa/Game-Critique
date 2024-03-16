import { Card, View } from "tamagui";
import { Text } from "ui/typography/text";

import { UserActivityCard } from "./user_activity_card/user_activity_card";
import { GameStatus } from "../../../../__generated__/types";

type UserActivityCardsProps = {
  activities: Activity[];
};

type Activity = {
  game: {
    status: GameStatus;
    name: string;
    formattedUpdatedAt: string;
    cover?: string | null;
  };
  ownerName?: string | null;
};

export const UserActivityCards = ({ activities }: UserActivityCardsProps) => {
  if (activities.length === 0) {
    return (
      <View display="flex" alignItems="center">
        <Text size="large" weight="semiBold" color="primary">
          Brak aktywności
        </Text>
      </View>
    );
  }
  return (
    <Card backgroundColor="$color.container" bordered>
      <Card.Header gap={8}>
        {activities.map((activity, index) => (
          <UserActivityCard
            key={activity.game.name + activity.game.status}
            game={{
              name: activity.game.name,
              status: activity.game.status,
              formattedUpdatedAt: activity.game.formattedUpdatedAt,
              cover: activity.game.cover,
            }}
            ownerName={activity.ownerName}
            displaySeparator={
              activities.length > 1 && index !== activities.length - 1
            }
          />
        ))}
      </Card.Header>
    </Card>
  );
};
