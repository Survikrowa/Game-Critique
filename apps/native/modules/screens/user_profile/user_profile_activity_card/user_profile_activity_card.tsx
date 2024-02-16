import { Fragment } from "react";
import { Card, Separator, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { parseStatus } from "./parse_activity_text";
import { GameStatus } from "../../../../__generated__/types";
import { truncateString } from "../../../strings/truncate_string";

type UserProfileActivityCardProps = {
  activities: Activity[];
};

type Activity = {
  game: {
    status: GameStatus;
    name: string;
    formattedUpdatedAt: string;
  };
};

export const UserProfileActivityCard = ({
  activities,
}: UserProfileActivityCardProps) => {
  return (
    <Card bordered>
      <Card.Header gap={8}>
        {activities.map((activity, index) => (
          <Fragment key={activity.game.name + activity.game.status}>
            <XStack justifyContent="space-between">
              <Text size="medium" color="primary" weight="normal">
                Dodał do {parseStatus(activity.game.status)}{" "}
              </Text>
              <Text size="medium" color="primary" weight="bold">
                {activity.game.name}
              </Text>
              <Text
                size="medium"
                color="primary"
                weight="normal"
                transform="capitalize"
              >
                {truncateString(activity.game.formattedUpdatedAt, 10)}
              </Text>
            </XStack>
            {activities.length > 1 && index !== activities.length - 1 && (
              <Separator marginVertical={8} />
            )}
          </Fragment>
        ))}
      </Card.Header>
    </Card>
  );
};
