import { ColumnDef } from "@tanstack/react-table";

import { useUsers } from "@/features/admin/users/use_users/use_users.ts";
import { TableDropdownUserActions } from "@/features/admin/users/users_data_table/table_dropdown_user_actions.tsx";
import { DataTable } from "@/packages/ui/data_display/data_table.tsx";
import { Skeleton } from "@/packages/ui/feedback/skeleton.tsx";
import { Role } from "@/types.ts";

type UserProfile = {
  id: number;
  name: string;
  role?: Role | null;
};
export const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "id",
    header: "UserID",
  },
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: () => {
      return <TableDropdownUserActions />;
    },
  },
];

export const UsersDataTable = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return <Skeleton />;
  }

  const users =
    usersQuery.data?.users.map((user) => ({
      id: user.id,
      name: user.profile?.name || "",
      role: user.role,
    })) ?? [];

  return <DataTable columns={columns} data={users} />;
};
