import { Folder, Trash2 } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Card, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { RemoveCollectionConfirmationModal } from "./remove_collection_confirmation_modal/remove_collection_confirmation_modal";
import { truncateString } from "../../strings/truncate_string";

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
  const renderLeftItems = () => {
    return (
      <YStack borderWidth={1} padding={16}>
        <RectButton onPress={() => setIsModalOpen(true)}>
          <XStack>
            <Trash2 />
          </XStack>
        </RectButton>
      </YStack>
    );
  };
  const onSingleTapEvent = () => {
    router.push(`/collection/${id}`);
  };
  return (
    <>
      <Swipeable renderLeftActions={renderLeftItems}>
        <Card
          padding={8}
          bordered
          width={cardWidth}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          onPress={onSingleTapEvent}
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
              {truncateString(name, 20)}
            </Text>
          </Card.Header>
          <XStack
            justifyContent="space-between"
            flexDirection="column"
            display="flex"
          >
            <Text size="medium" weight="bold" color="secondary">
              {truncateString(description, 40)}
            </Text>
          </XStack>
          <Text size="medium" weight="bold" color="secondary">
            Ilość w kolekcji: {count}
          </Text>
        </Card>
      </Swipeable>
      <RemoveCollectionConfirmationModal
        open={isModalOpen}
        onOpen={setIsModalOpen}
        collectionId={id}
      />
    </>
  );
};
