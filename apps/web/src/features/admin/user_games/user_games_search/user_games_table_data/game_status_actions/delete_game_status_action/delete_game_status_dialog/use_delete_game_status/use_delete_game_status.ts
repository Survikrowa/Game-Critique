import { useQueryClient } from "@tanstack/react-query";

import {
  DeleteGameStatusMutation,
  useDeleteGameStatusMutation,
} from "@/features/admin/user_games/user_games_search/user_games_table_data/game_status_actions/delete_game_status_action/delete_game_status_dialog/use_delete_game_status/delete_game_status.generated.ts";
import { useToast } from "@/packages/ui/feedback/toast/use-toast.ts";

type UseDeleteGameStatusArgs = {
  onSuccess: (data: DeleteGameStatusMutation) => void;
};

export const useDeleteGameStatus = ({ onSuccess }: UseDeleteGameStatusArgs) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useDeleteGameStatusMutation({
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["UserGamesStatus"] });
      toast({
        title: "Game status deleted",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: `Error occurred while deleting game status ${error}`,
        variant: "destructive",
      });
    },
  });
};
