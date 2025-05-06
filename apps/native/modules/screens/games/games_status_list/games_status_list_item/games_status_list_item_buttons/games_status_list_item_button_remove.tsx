import { MutationFunctionOptions } from "@apollo/client";
import { Trash } from "@tamagui/lucide-icons";
import { Exact } from "__generated__/types";

import { RemoveGameStatusConfirmationDialog } from "./remove_game_status_action/remove_game_status_confirmation_dialog";
import { RemoveGameStatusMutation } from "./use_remove_game_status/remove_game_status_mutation.generated";
import { ButtonWithIcon } from "../../../../../../ui/forms/button_icon";
import { useDisclosure } from "../../../../../../ui/hooks/use_disclosure";

type GamesStatusListItemButtonRemoveProps = {
  gameStatusId: number;
  onClick: () => void;
  onRemoveAccept: (
    options?: MutationFunctionOptions<
      RemoveGameStatusMutation,
      Exact<{
        gameStatusId: number;
      }>
    >,
  ) => void;
};

export const GamesStatusListItemButtonRemove = ({
  gameStatusId,
  onClick,
  onRemoveAccept,
}: GamesStatusListItemButtonRemoveProps) => {
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
          onRemoveAccept({
            variables: {
              gameStatusId,
            },
          });
        }}
      />
    </>
  );
};
