import { GamesStatusListItemButtonEdit } from "./games_status_list_item_button_edit";
import { GamesStatusListItemButtonGoToDetails } from "./games_status_list_item_button_go_to_details";
import { GamesStatusListItemButtonRemove } from "./games_status_list_item_button_remove";

type GamesStatusListItemButtonsProps = {
  gameStatusId: number;
  oauthId?: string;
  onClick: () => void;
  onRemoveAccept: () => void;
};

export const GamesStatusListItemButtons = ({
  gameStatusId,
  oauthId,
  onClick,
  onRemoveAccept,
}: GamesStatusListItemButtonsProps) => {
  return (
    <>
      <GamesStatusListItemButtonGoToDetails
        gameStatusId={gameStatusId}
        oauthId={oauthId}
        onClick={onClick}
      />
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
