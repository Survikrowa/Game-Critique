import { ReactNode } from "react";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import { View } from "tamagui";
import { useDisclosure } from "ui/hooks/use_disclosure";
import { ContextMenuItemElement } from "ui/menu/context_menu/context_menu_items/context_menu_item";
import { ContextMenuItems } from "ui/menu/context_menu/context_menu_items/context_menu_items";

type ContextMenuProps = {
  waitFor?: string;
  minDurationMs?: number;
  children: ReactNode;
  onItemPress: (itemId: string) => void;
  items: ContextMenuItemElement[];
};

export const ContextMenu = ({
  minDurationMs = 500,
  children,
  items,
  onItemPress,
}: ContextMenuProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure(false);
  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onOpen();
        }
      }}
      minDurationMs={minDurationMs}
    >
      <View position="relative">
        {children}
        {isOpen && (
          <ContextMenuItems
            items={items}
            onPress={(itemId) => {
              onItemPress(itemId);
              onClose();
            }}
          />
        )}
      </View>
    </LongPressGestureHandler>
  );
};
