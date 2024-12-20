import { useToast } from "@/packages/ui/feedback/toast/use-toast.ts";
import {
  UpdateUserRoleMutation,
  useUpdateUserRoleMutation,
} from "@/packages/user_roles/use_update_user_role/update_user_role.generated.ts";

type OnSuccess = (data: UpdateUserRoleMutation) => void;

type UpdateUserRoleArgs = {
  onSuccess: OnSuccess;
};

export const useUpdateUserRole = ({ onSuccess }: UpdateUserRoleArgs) => {
  const { toast } = useToast();
  return useUpdateUserRoleMutation({
    onSuccess,
    onError: () => {
      toast({
        title: "User role update failed",
        description: "Something went wrong while updating the user role",
        variant: "destructive" as const,
      });
    },
  });
};
