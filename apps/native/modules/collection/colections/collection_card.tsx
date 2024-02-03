import { Folder } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import ContextMenu from "react-native-context-menu-view";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { Card, XStack } from "tamagui";
import { Text } from "ui/typography/text";

import { RemoveCollectionConfirmationModal } from "./remove_collection_confirmation_modal/remove_collection_confirmation_modal";

type CollectionCardProps = {
  name: string;
  count: number;
  description: string;
  id: string;
};

const cardGap = 16;

export const CollectionCard = ({
  name,
  id,
  count,
  description,
}: CollectionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
  const onSingleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      router.push(`/collection/${id}`);
    }
  };
  return (
    <ContextMenu
      actions={[
        {
          title: "Usuń",
          systemIcon: "trash",
          destructive: true,
        },
      ]}
      previewBackgroundColor="black"
      onPress={async (e) => {
        if (e.nativeEvent.index === 0) {
          setIsModalOpen(true);
        }
      }}
    >
      <TapGestureHandler onHandlerStateChange={onSingleTapEvent}>
        <Card
          padding={8}
          elevate
          bordered
          width={cardWidth}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Card.Background />
          <Card.Header
            padded
            gap={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Folder size="$3" />
            <Text size="large" weight="bold" color="primary">
              {name.length > 20 ? `${name.slice(0, 20)}...` : name}
            </Text>
          </Card.Header>
          <XStack
            justifyContent="space-between"
            flexDirection="column"
            display="flex"
          >
            <Text size="medium" weight="bold" color="secondary">
              {description.length > 50
                ? `${description.slice(0, 40)}...`
                : description}
            </Text>
          </XStack>
          <Text size="medium" weight="bold" color="secondary">
            Ilość w kolekcji: {count}
          </Text>
        </Card>
      </TapGestureHandler>
      <RemoveCollectionConfirmationModal
        open={isModalOpen}
        onOpen={setIsModalOpen}
        collectionId={id}
      />
    </ContextMenu>
  );
};
