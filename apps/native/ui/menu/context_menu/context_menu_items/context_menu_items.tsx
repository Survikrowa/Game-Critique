import { YStack } from "tamagui";
import {
  ContextMenuItem,
  ContextMenuItemElement,
} from "ui/menu/context_menu/context_menu_items/context_menu_item";

type ContextMenuItemsProps = {
  items: ContextMenuItemElement[];
  onPress: (itemId: string) => void;
};

export const ContextMenuItems = ({ items, onPress }: ContextMenuItemsProps) => {
  return (
    <YStack
      backgroundColor="white"
      position="absolute"
      justifyContent="center"
      alignItems="center"
      padding={8}
      width={80}
      top="50%"
      left="50%"
      borderRadius={8}
      borderWidth={1}
    >
      {items.map((item) => {
        return <ContextMenuItem key={item.id} item={item} onPress={onPress} />;
      })}
    </YStack>
  );
};
