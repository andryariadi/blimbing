"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { DataTablePagination } from "@/components/TablePagination";
import { DepositoType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDepositoType } from "@/lib/actions/depositotype.action";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const selectedRows = table.getSelectedRowModel().rows;

      return await Promise.all(
        selectedRows.map(async (row) => {
          const depositoTypeId = (row.original as DepositoType).id;

          await deleteDepositoType(depositoTypeId);
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposito-types"] });

      setRowSelection({});

      toast.success("Deposito Type(s) deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="rounded-md border">
      {/* Delete Button */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md m-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            <Trash2 className="w-4 h-4" />
            {mutation.isPending ? "Deleting..." : `Delete Deposito Type(s) ${Object.keys(rowSelection).length}`}
          </button>
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined,
                    }}
                  >
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

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
