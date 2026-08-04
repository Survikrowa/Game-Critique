import { Text } from "ui/typography/text";

import { UserActivityCard } from "./user_activity_card/user_activity_card";
import { GameStatus } from "../../../../__generated__/types";

import { VStack } from "@/ui/layout/vstack/vstack";
import { Card } from "@/ui/panels/card/card";

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
  oauthId: string;
  gameStatusId: number | null | undefined;
};

export const UserActivityCards = ({ activities }: UserActivityCardsProps) => {
  if (activities.length === 0) {
    return (
      <VStack className="items-center">
        <Text size="large" weight="semiBold" color="primary">
          Brak aktywności
        </Text>
      </VStack>
    );
  }
  return (
    <Card variant="bordered">
      <VStack className="gap-2">
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
            oauthId={activity.oauthId}
            gameStatusId={activity.gameStatusId}
            displaySeparator={
              activities.length > 1 && index !== activities.length - 1
            }
          />
        ))}
      </VStack>
    </Card>
  );
};
