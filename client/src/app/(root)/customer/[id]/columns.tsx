"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Account } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "id",
    header: "Account ID",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</div>,
    size: 100,
  },
  {
    accessorKey: "depositoType.name",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent">
          <span>Deposito Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const deposito = row.original.packet;

      return (
        <div className="space-y-1">
          <div className="font-medium">{deposito?.name || "N/A"}</div>
          <div className="text-xs text-muted-foreground">{deposito?.yearlyReturn}% yearly return</div>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent">
          <span>Balance</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"));
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(balance)}
        </div>
      );
    },
    size: 100,
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
    size: 100,
  },
  {
    id: "actions",
    header: () => {
      return <span className="flex items-center justify-end">Actions</span>;
    },
    cell: ({ row }) => {
      const account = row.original;

      return (
        <div className="text-right">
          <Link href={`/accounts/${account.id}/transactions`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View transactions</span>
            </Button>
          </Link>
        </div>
      );
    },
    size: 100,
  },
];
