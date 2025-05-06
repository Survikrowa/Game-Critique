import { Trash } from "@tamagui/lucide-icons";

import { RemoveGameStatusAction } from "./remove_game_status_action/remove_game_status_action";
import { RemoveGameStatusConfirmationDialog } from "./remove_game_status_action/remove_game_status_confirmation_dialog";
import { useRemoveGameStatus } from "./use_remove_game_status/use_remove_game_status";
import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";
import { useDisclosure } from "../../../../../../ui/hooks/use_disclosure";

type GamesStatusListItemButtonRemoveProps = {
  gameStatusId: number;
  onClick: () => void;
};

export const GamesStatusListItemButtonRemove = ({
  gameStatusId,
  onClick,
}: GamesStatusListItemButtonRemoveProps) => {
  // const [removeGameStatus] = useRemoveGameStatus();

  const { onOpen, isOpen, onClose } = useDisclosure(false);
  return (
    <>
      <ButtonWithIcon
        onPress={() => {
          onOpen();
          onClick();
        }}
        icon={<Trash />}
        backgroundColor="$red8"
        width="100%"
      >
        Usuń
      </ButtonWithIcon>
      <RemoveGameStatusConfirmationDialog
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onApprove={() => {
          // removeGameStatus({
          //   variables: {
          //     gameStatusId,
          //   },
          // });
        }}
      />
    </>
  );
};
