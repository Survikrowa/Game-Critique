import { EditRoleFormSchema } from "@/features/admin/users/users_data_table/item_actions/edit_role_item_action/edit_role_dialog/edit_role_form/use_editor_role_form/edit_role_form_schema.ts";
import { useZodForm } from "@/packages/forms/use_zod_form.ts";
import { useToast } from "@/packages/ui/feedback/toast/use-toast.ts";
import { useGetUserRoles } from "@/packages/user_roles/use_get_user_roles/use_get_user_roles.ts";
import { useUpdateUserRole } from "@/packages/user_roles/use_update_user_role/use_update_user_role.ts";

type UseEditRoleFormArgs = {
  userOauthId: string;
  onUpdateRoleSuccess: () => void;
};

export const useEditRoleForm = ({
  userOauthId,
  onUpdateRoleSuccess,
}: UseEditRoleFormArgs) => {
  const userRoles = useGetUserRoles();
  const { toast } = useToast();
  const updateUserRolesMutation = useUpdateUserRole({
    onSuccess: (data) => {
      if (data.updateUserRole.success) {
        onUpdateRoleSuccess();
        toast({
          title: "User role updated",
          description: `User role has been updated`,
          variant: "default",
        });
      }
    },
  });
  const form = useZodForm({
    schema: EditRoleFormSchema,
  });
  const onSubmit = form.handleSubmit(async (data) => {
    await updateUserRolesMutation.mutateAsync({
      updateUserRoleInput: {
        roleId: Number(data.roleId),
        userOauthId,
      },
    });
  });
  return {
    form,
    onSubmit,
    userRoles,
    isUpdating: updateUserRolesMutation.isPending,
  };
};
