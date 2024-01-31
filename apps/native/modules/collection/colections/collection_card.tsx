import { router } from "expo-router";
import ContextMenu from "react-native-context-menu-view";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { Card, XStack } from "tamagui";
import { Text } from "ui/typography/text";

type CollectionCardProps = {
  name: string;
  count: number;
  description: string;
  id: string;
};

export const CollectionCard = ({
  name,
  id,
  count,
  description,
}: CollectionCardProps) => {
  const onSingleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      router.push(`/collection/${id}`);
    }
  };
  return (
    <ContextMenu
      actions={[{ title: "Usuń", systemIcon: "trash", destructive: true }]}
      previewBackgroundColor="black"
      onPress={(e) => console.log(e.nativeEvent)}
    >
      <TapGestureHandler onHandlerStateChange={onSingleTapEvent}>
        <Card elevate size="$4" bordered height={120} width="auto">
          <Card.Background />
          <Card.Header padded gap={4}>
            <Text size="large" weight="bold" color="primary">
              {name}
            </Text>
            <XStack justifyContent="space-between">
              <XStack maxWidth="50%">
                <Text size="medium" weight="bold" color="secondary">
                  {description.length > 50
                    ? `${description.slice(0, 50)}...`
                    : description}
                </Text>
              </XStack>

              <Text size="medium" weight="bold" color="secondary">
                Ilość w kolekcji: {count}
              </Text>
            </XStack>
          </Card.Header>
        </Card>
      </TapGestureHandler>
    </ContextMenu>
  );
};
