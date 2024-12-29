import { useUsersQuery } from "@/features/admin/users/use_users/users.generated.ts";

export const useUsers = () => {
  return useUsersQuery();
};
