import { ReactNode } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";

type SheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  displayAsModal?: boolean;
  snapPointsMode?: "percent" | "constant" | "fit" | "mixed";
  children: ReactNode;
};

export const Sheet = ({
  onOpenChange,
  isOpen,
  displayAsModal,
  children,
}: SheetProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-background-50 rounded-t-3xl border-t border-outline-0 max-h-[85%]">
              <View className="w-12 h-1 bg-outline-200 rounded-full self-center my-3" />
              <ScrollView>{children}</ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
