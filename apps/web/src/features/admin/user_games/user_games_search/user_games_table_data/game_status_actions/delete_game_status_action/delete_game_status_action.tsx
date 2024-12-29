import { DeleteGameStatusDialog } from "@/features/admin/user_games/user_games_search/user_games_table_data/game_status_actions/delete_game_status_action/delete_game_status_dialog/delete_game_status_dialog.tsx";

type DeleteGameStatusActionProps = {
  userOauthId: string;
  gameStatusId: number;
};

export const DeleteGameStatusAction = ({
  userOauthId,
  gameStatusId,
}: DeleteGameStatusActionProps) => {
  return (
    <DeleteGameStatusDialog
      gameStatusId={gameStatusId}
      userOauthId={userOauthId}
    />
  );
};
