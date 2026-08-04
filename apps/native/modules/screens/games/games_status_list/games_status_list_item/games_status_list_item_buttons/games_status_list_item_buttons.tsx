import { GamesStatusListItemButtonEdit } from "./games_status_list_item_button_edit";
import { GamesStatusListItemButtonRemove } from "./games_status_list_item_button_remove";

type GamesStatusListItemButtonsProps = {
  gameStatusId: number;
  onClick: () => void;
  onRemoveAccept: () => void;
};

export const GamesStatusListItemButtons = ({
  gameStatusId,
  onClick,
  onRemoveAccept,
}: GamesStatusListItemButtonsProps) => {
  return (
    <>
      <GamesStatusListItemButtonEdit
        gameStatusId={gameStatusId}
        onClick={onClick}
      />
      <GamesStatusListItemButtonRemove
        gameStatusId={gameStatusId}
        onClick={onClick}
        onRemoveAccept={onRemoveAccept}
      />
    </>
  );
};
