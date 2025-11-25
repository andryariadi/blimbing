"use client";

import DepositoTyperForm from "@/components/DepositoTypeForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DepositoType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Edit } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<DepositoType>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</div>,
    size: 200,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center justify-center hover:bg-transparent">
          <span>Name</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium text-center">{row.getValue("name")}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "yearlyReturn",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center justify-center hover:bg-transparent">
          <span>Yearly Return</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium text-center">{row.getValue("yearlyReturn")}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent">
          <span>Created At</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-sm text-muted-foreground">{formatDate(date)}</div>;
    },
    size: 150,
  },
  {
    id: "actions",
    header: () => {
      return <span className="flex items-center justify-end">Actions</span>;
    },
    cell: ({ row }) => {
      const depositoType = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          {/* View Button */}
          <Link href={`/deposito-type/${depositoType.id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View deposito type</span>
            </Button>
          </Link>

          {/* Edit Button */}
          <DepositoTyperForm title="Update Deposito Type" description="Start by updating deposito type information to the system" icon={<Edit size={40} />} depositoType={depositoType} />
        </div>
      );
    },
    size: 120,
  },
];
