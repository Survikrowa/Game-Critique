import { EditRoleDialog } from "@/features/admin/users/users_data_table/item_actions/edit_role_item_action/edit_role_dialog/edit_role_dialog.tsx";
import { Dialog, DialogTrigger } from "@/packages/ui/feedback/dialog.tsx";
import { useDisclosure } from "@/packages/ui/hooks/use_disclosure.ts";
import { DropdownMenuItem } from "@/packages/ui/navigation/dropdown.tsx";

type EditRoleItemActionProps = {
  userOauthId: string;
};

export const EditRoleItemAction = ({
  userOauthId,
}: EditRoleItemActionProps) => {
  const { isOpen, onSet, onClose } = useDisclosure();
  return (
    <Dialog open={isOpen} onOpenChange={onSet}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
        <DialogTrigger>Edit role</DialogTrigger>
      </DropdownMenuItem>
      <EditRoleDialog userOauthId={userOauthId} onUpdateRoleSuccess={onClose} />
    </Dialog>
  );
};
