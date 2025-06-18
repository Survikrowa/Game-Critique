import { useUpdateGameDetailsMutation } from "@/features/admin/games/games_list_table/games_list_row_actions/games_list_row_action_update_game/use_update_game_details/update_game_details.generated.ts";
import { useToast } from "@/packages/ui/feedback/toast/use-toast.ts";

type UseUpdateGameDetailsArgs = {
  onSuccess: () => void;
};

export const useUpdateGameDetails = ({
  onSuccess,
}: UseUpdateGameDetailsArgs) => {
  const toastManager = useToast();
  return useUpdateGameDetailsMutation({
    onSuccess: (data) => {
      toastManager.toast({
        title: `Game ${data.updateGameData.hltbId} updated`,
        description: data.updateGameData.message,
        variant: "default",
      });
      onSuccess();
    },
  });
};
