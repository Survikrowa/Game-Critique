import { UsersDataTable } from "@/features/admin/users/users_data_table/users_data_table.tsx";

export const UsersPage = () => {
  return (
    <main className="w-full flex flex-col">
      <UsersDataTable />
    </main>
  );
};
