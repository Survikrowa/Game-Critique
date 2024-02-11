import { ReactNode } from "react";
import {
  Button,
  XStack,
  YStack,
  AlertDialog as TamaguiAlertDialog,
} from "tamagui";

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
          <YStack space>
            <TamaguiAlertDialog.Title>{title}</TamaguiAlertDialog.Title>
            <TamaguiAlertDialog.Description>
              {description}
            </TamaguiAlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end" gap={8}>
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
            </XStack>
          </YStack>
        </TamaguiAlertDialog.Content>
      </TamaguiAlertDialog.Portal>
    </TamaguiAlertDialog>
  );
};
