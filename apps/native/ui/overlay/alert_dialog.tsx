import { ReactNode } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

type AlertDialogProps = {
  title: string;
  description: string;
  onApprove: () => void;
  open: boolean;
  onOpen: (open: boolean) => void;
  onClose: () => void;
  buttonsText: {
    approve: ReactNode;
    decline: ReactNode;
  };
};

export const AlertDialog = ({
  title,
  buttonsText,
  onApprove,
  onOpen,
  onClose,
  open,
  description,
}: AlertDialogProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => onOpen(false)}>
        <View className="flex-1 items-center justify-center bg-black/60">
          <TouchableWithoutFeedback>
            <View className="bg-background-50 rounded-2xl p-6 mx-6 w-full max-w-sm border border-outline-0">
              <VStack space="md">
                <Text className="text-typography-100 text-heading font-semibold">
                  {title}
                </Text>
                <Text className="text-typography-500 text-base">
                  {description}
                </Text>
                <HStack
                  space="md"
                  style={{ justifyContent: "flex-end", gap: 8 }}
                >
                  <Button action="default" variant="outline" onPress={onClose}>
                    <ButtonText>{buttonsText.decline}</ButtonText>
                  </Button>
                  <Button action="negative" onPress={onApprove}>
                    <ButtonText>{buttonsText.approve}</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
