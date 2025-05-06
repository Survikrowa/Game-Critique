import { Edit, Eye, Trash } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Image, YStack } from "tamagui";

import { ButtonWithIcon } from "../../../../../ui/forms/button_icon";
import { ClearButton } from "../../../../../ui/forms/clear_button";
import { Sheet } from "../../../../../ui/panels/sheet/sheet";
import { Text } from "../../../../../ui/typography/text";
import { truncateString } from "../../../../strings/truncate_string";

type GamesStatusListItemProps = {
  item: {
    title: string;
    platform: string;
    score: string;
    cover: string;
  };
};

export const GamesStatusListItem = ({ item }: GamesStatusListItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <ClearButton onPress={() => setIsSheetOpen(true)}>
      <YStack gap={8}>
        <Image
          borderRadius={4}
          source={{ uri: item.cover, width: 112, height: 142 }}
          style={{
            objectFit: "fill",
          }}
        />
        <YStack>
          <Text size="medium" weight="bold" color="primary">
            {truncateString(item.title, 15)}
          </Text>
          <Text size="small" weight="normal" color="secondary">
            {item.platform}
          </Text>
          {item.score && (
            <Text size="small" weight="bold" color="secondary">
              Ocena: {item.score.replace("-", ",")}
            </Text>
          )}
        </YStack>
        <Sheet
          onOpenChange={setIsSheetOpen}
          snapPointsMode="constant"
          isOpen={isSheetOpen}
          displayAsModal
        >
          <YStack padding={16} gap={16} alignItems="center">
            <Text size="medium" weight="bold" color="primary">
              {item.title}
            </Text>
            <ButtonWithIcon
              onPress={() => {}}
              icon={<Eye />}
              backgroundColor="$red1"
              width="100%"
            >
              Przejdź do szczegółów
            </ButtonWithIcon>
            <ButtonWithIcon
              onPress={() => {}}
              icon={<Edit />}
              backgroundColor="$green8"
              width="100%"
            >
              Edytuj
            </ButtonWithIcon>
            <ButtonWithIcon
              onPress={() => {}}
              icon={<Trash />}
              backgroundColor="$red8"
              width="100%"
            >
              Usuń
            </ButtonWithIcon>
          </YStack>
        </Sheet>
      </YStack>
    </ClearButton>
  );
};
