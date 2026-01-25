import { ReactNode } from "react";
import { Button, AlertDialog as TamaguiAlertDialog } from "tamagui";

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
    <TamaguiAlertDialog open={open} onOpenChange={onOpen}>
      <TamaguiAlertDialog.Trigger />
      <TamaguiAlertDialog.Portal>
        <TamaguiAlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <TamaguiAlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <VStack space="md">
            <TamaguiAlertDialog.Title>{title}</TamaguiAlertDialog.Title>
            <TamaguiAlertDialog.Description>
              {description}
            </TamaguiAlertDialog.Description>

            <HStack space="md" style={{ justifyContent: "flex-end", gap: 8 }}>
              <Button onPress={onClose}>{buttonsText.decline}</Button>
              <TamaguiAlertDialog.Action asChild>
                <Button
                  theme="active"
                  backgroundColor="black"
                  color="white"
                  onPress={onApprove}
                >
                  {buttonsText.approve}
                </Button>
              </TamaguiAlertDialog.Action>
            </HStack>
          </VStack>
        </TamaguiAlertDialog.Content>
      </TamaguiAlertDialog.Portal>
    </TamaguiAlertDialog>
  );
};
