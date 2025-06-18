import { useUpdateGameDetails } from "@/features/admin/games/games_list_table/games_list_row_actions/games_list_row_action_update_game/use_update_game_details/use_update_game_details.ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui/feedback/dialog.tsx";
import { useDisclosure } from "@/packages/ui/hooks/use_disclosure.ts";
import { Button } from "@/packages/ui/inputs/button.tsx";
import { DropdownMenuItem } from "@/packages/ui/navigation/dropdown.tsx";

type GamesListRowActionUpdateGameProps = {
  hltbId: number;
};

export const GamesListRowActionUpdateGame = ({
  hltbId,
}: GamesListRowActionUpdateGameProps) => {
  const { isOpen, onSet } = useDisclosure();
  const updateGameDeatilsMutation = useUpdateGameDetails({
    onSuccess: () => {
      onSet(false);
    },
  });

  const onUpdateGameDetails = () => {
    updateGameDeatilsMutation.mutateAsync({
      hltbId,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onSet}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
        <DialogTrigger>Update game hltb data</DialogTrigger>
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to update this game?</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button
          disabled={updateGameDeatilsMutation.isPending}
          onClick={onUpdateGameDetails}
          variant="default"
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};
