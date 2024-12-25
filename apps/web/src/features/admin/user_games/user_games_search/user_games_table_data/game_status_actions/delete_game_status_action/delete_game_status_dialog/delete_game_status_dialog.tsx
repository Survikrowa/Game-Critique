import { useDeleteGameStatus } from "@/features/admin/user_games/user_games_search/user_games_table_data/game_status_actions/delete_game_status_action/delete_game_status_dialog/use_delete_game_status/use_delete_game_status.ts";
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

type DeleteGameStatusDialogProps = {
  userOauthId: string;
  gameStatusId: number;
};

export const DeleteGameStatusDialog = ({
  userOauthId,
  gameStatusId,
}: DeleteGameStatusDialogProps) => {
  const { onSet, isOpen } = useDisclosure(false);
  const { mutateAsync, isPending } = useDeleteGameStatus({
    onSuccess: () => {
      onSet(false);
    },
  });
  const onDelete = async () => {
    await mutateAsync({
      userOauthId,
      gameStatusId,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onSet}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
        <DialogTrigger>Delete</DialogTrigger>
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this game status?
          </DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button disabled={isPending} onClick={onDelete} variant="destructive">
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};
