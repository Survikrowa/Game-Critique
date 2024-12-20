import { EditRoleForm } from "@/features/admin/users/users_data_table/item_actions/edit_role_item_action/edit_role_dialog/edit_role_form/edit_role_form.tsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/packages/ui/feedback/dialog.tsx";

type EditRoleDialogProps = {
  userOauthId: string;
  onUpdateRoleSuccess: () => void;
};

export const EditRoleDialog = ({
  userOauthId,
  onUpdateRoleSuccess,
}: EditRoleDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select a role</DialogTitle>
        <DialogDescription>Please be careful</DialogDescription>
        <DialogContent>
          <EditRoleForm
            userOauthId={userOauthId}
            onUpdateRoleSuccess={onUpdateRoleSuccess}
          />
        </DialogContent>
      </DialogHeader>
    </DialogContent>
  );
};
