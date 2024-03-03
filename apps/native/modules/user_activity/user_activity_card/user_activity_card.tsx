import { Fragment } from "react";
import { Card, Image, Separator, View, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { GameStatus } from "../../../__generated__/types";
import { parseStatus } from "../parse_activity_text";

type UserActivityCardProps = {
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

export const UserActivityCard = ({ activities }: UserActivityCardProps) => {
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
          <Fragment key={activity.game.name + activity.game.status}>
            <XStack justifyContent="space-between">
              <YStack justifyContent="space-between" gap={4}>
                <Text size="medium" color="primary" weight="bold">
                  {activity.game.name}
                </Text>
                <YStack>
                  {activity.ownerName && (
                    <Text size="medium" color="primary" weight="bold">
                      {activity.ownerName}{" "}
                    </Text>
                  )}

                  <Text size="medium" color="primary" weight="normal">
                    Dodał do {parseStatus(activity.game.status)}{" "}
                  </Text>
                </YStack>

                <Text
                  size="medium"
                  color="primary"
                  weight="normal"
                  transform="capitalize"
                >
                  {activity.game.formattedUpdatedAt}
                </Text>
              </YStack>
              <View height="80" width="80">
                {activity.game.cover && (
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: activity.game.cover,
                      width: 100,
                      height: 80,
                    }}
                  />
                )}
              </View>
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
