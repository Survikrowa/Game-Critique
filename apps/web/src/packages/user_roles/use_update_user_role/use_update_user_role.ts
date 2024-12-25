import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useUpdateUserRoleMutation({
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: () => {
      toast({
        title: "User role update failed",
        description: "Something went wrong while updating the user role",
        variant: "destructive" as const,
      });
    },
  });
};
