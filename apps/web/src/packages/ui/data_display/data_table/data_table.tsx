import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { DataTablePagination } from "@/packages/ui/data_display/data_table/data_table_pagination.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/packages/ui/data_display/table.tsx";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  withPagination?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  manualPagination?: boolean;
  rowCount?: number;
  pageCount?: number;
};

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  withPagination,
  manualPagination,
  rowCount,
  pagination,
  onPaginationChange,
  pageCount,
}: DataTableProps<TData, TValue>) => {
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    rowCount,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
    state: withPagination
      ? { pagination: manualPagination ? pagination : internalPagination }
      : {},
    onPaginationChange: (updaterOrValue) => {
      if (manualPagination && onPaginationChange) {
        return onPaginationChange(updaterOrValue);
      }
      if (withPagination) {
        return setInternalPagination(updaterOrValue);
      }
      return undefined;
    },
    manualPagination,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {withPagination && <DataTablePagination table={table} />}
    </div>
  );
};
