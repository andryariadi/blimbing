"use client";

import AccountForm from "@/components/AccountForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Account } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Account>[] = [
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
    header: "Account ID",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue("id")}</div>,
    size: 100,
  },
  {
    accessorKey: "customer.name",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Customer Name</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const customer = row.original.customer;
      return <div className="font-medium">{customer?.name || "N/A"}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "packet.name",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Deposito Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const packet = row.original.packet;
      return (
        <div className="space-y-1">
          <div className="font-medium capitalize">{packet?.name || "N/A"}</div>
          <div className="text-xs text-muted-foreground">{packet?.yearlyReturn}% yearly return</div>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Balance</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"));
      return <div className="font-medium">{formatCurrency(balance)}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Created</span>
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
        <div className="flex justify-end space-x-1">
          <Link href={`/account/${account.id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View transactions</span>
            </Button>
          </Link>

          <AccountForm title="Update Account" description="Start by updating account information to the system" icon={<Edit size={40} />} account={account} />
        </div>
      );
    },
    size: 100,
  },
];
