import { Trash } from "@tamagui/lucide-icons";
import { Spinner, View } from "tamagui";
import { useDisclosure } from "ui/hooks/use_disclosure";

import { RemoveGameStatusConfirmationDialog } from "./remove_game_status_confirmation_dialog";
import { useRemoveGameStatus } from "./use_remove_game_status/use_remove_game_status";

type RemoveGameStatusActionProps = {
  gameStatusId: number;
};

export const RemoveGameStatusAction = ({
  gameStatusId,
}: RemoveGameStatusActionProps) => {
  const [removeGameStatus, { loading }] = useRemoveGameStatus();

  const { onOpen, isOpen, onClose } = useDisclosure(false);
  return (
    <>
      <View onPress={onOpen}>
        {loading ? <Spinner size="small" /> : <Trash color="white" />}
      </View>
      <RemoveGameStatusConfirmationDialog
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onApprove={() => {
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
