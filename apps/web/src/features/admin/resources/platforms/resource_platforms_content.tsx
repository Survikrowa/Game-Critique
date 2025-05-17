import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { PlatformActions } from "@/features/admin/resources/platforms/platform_actions/platform_actions.tsx";
import { useGetAllPlatforms } from "@/features/admin/resources/platforms/use_get_all_platforms/use_get_all_platforms.ts";
import { DataTable } from "@/packages/ui/data_display/data_table/data_table.tsx";

type Platform = {
  id: number;
  name: string;
  displayName?: string | null;
};

export const ResourcePlatformsContent = () => {
  const platformsQuery = useGetAllPlatforms();

  const columns = useMemo<ColumnDef<Platform>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Platform Name",
      },
      {
        accessorKey: "displayName",
        header: "Display Name",
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <PlatformActions
            platformId={row.original.id}
            initialDisplayName={row.original.displayName ?? ""}
          />
        ),
      },
    ],
    [],
  );

  const platforms = platformsQuery.data?.platforms.platforms || [];

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <h1 className="text-2xl font-bold">Platforms</h1>

      {platformsQuery.isLoading && <p>Loading platforms...</p>}

      {platformsQuery.isError && (
        <p className="text-red-500">Error loading platforms</p>
      )}

      {platformsQuery.isSuccess && (
        <DataTable columns={columns} data={platforms} withPagination />
      )}
    </div>
  );
};
