"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const isDeposit = type === "DEPOSIT";

      return <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDeposit ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{type}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Amount</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type = row.original.type;
      const isDeposit = type === "DEPOSIT";

      return (
        <div className={`font-medium ${isDeposit ? "text-green-600" : "text-red-600"}`}>
          {isDeposit ? "+" : "-"}{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount)}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Transaction Date</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("transactionDate"));
      return <div className="text-sm text-muted-foreground">{formatDate(date)}</div>;
    },
    size: 120,
  },
  {
    accessorKey: "balanceBefore",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Starting Balance</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balanceBefore"));
      return <div className="text-sm">{formatCurrency(balance)}</div>;
    },
    size: 120,
  },
  {
    accessorKey: "balanceAfter",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center hover:bg-transparent cursor-pointer">
          <span>Ending Balance</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balanceAfter"));

      return <div className="font-medium">{formatCurrency(balance)}</div>;
    },
    size: 120,
  },
  {
    accessorKey: "interestEarned",
    header: ({ column }) => {
      return (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center justify-end hover:bg-transparent cursor-pointer">
          <span>Interest Earned</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const interest = parseFloat(row.getValue("interestEarned"));

      return (
        <div className="text-sm text-blue-600 text-right">
          {interest > 0 ? "+" : ""}
          {formatCurrency(interest)}
        </div>
      );
    },
    size: 120,
  },
];
