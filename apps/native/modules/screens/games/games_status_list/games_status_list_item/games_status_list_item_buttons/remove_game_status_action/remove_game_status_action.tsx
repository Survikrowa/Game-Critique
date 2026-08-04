import { Trash } from "lucide-react-native";
import { ActivityIndicator, Pressable } from "react-native";
import { useDisclosure } from "ui/hooks/use_disclosure";

import { RemoveGameStatusConfirmationDialog } from "./remove_game_status_confirmation_dialog";
import { useRemoveGameStatus } from "./use_remove_game_status/use_remove_game_status";
import { haptic } from "@/modules/haptics/haptic";

type RemoveGameStatusActionProps = {
  gameStatusId: number;
};

export const RemoveGameStatusAction = ({
  gameStatusId,
}: RemoveGameStatusActionProps) => {
  const [removeGameStatus, { loading }] = useRemoveGameStatus();

  const { onOpen, isOpen, onClose } = useDisclosure(false);

  const handleOpen = () => {
    haptic.heavy();
    onOpen();
  };

  return (
    <>
      <Pressable
        onPress={handleOpen}
        className="min-h-[44px] min-w-[44px] items-center justify-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#3B82F6" />
        ) : (
          <Trash size={18} color="#64748B" />
        )}
      </Pressable>
      <RemoveGameStatusConfirmationDialog
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onApprove={() => {
          haptic.warning();
          removeGameStatus({
            variables: {
              gameStatusId,
            },
          });
        }}
      />
    </>
  );
};
