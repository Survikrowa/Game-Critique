import { View } from "tamagui";
import { Text } from "ui/typography/text";

export type ContextMenuItemElement = {
  id: string;
  title: string;
};

type ContextMenuItemProps = {
  item: ContextMenuItemElement;
  onPress: (itemId: string) => void;
};
export const ContextMenuItem = ({ item, onPress }: ContextMenuItemProps) => {
  return (
    <View onPress={() => onPress(item.id)}>
      <Text size="small" weight="bold" color="primary">
        {item.title}
      </Text>
    </View>
  );
};
