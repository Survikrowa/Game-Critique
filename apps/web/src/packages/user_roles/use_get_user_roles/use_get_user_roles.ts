import { useRolesQuery } from "@/packages/user_roles/use_get_user_roles/roles.generated.ts";

export const useGetUserRoles = () => {
  return useRolesQuery();
};
