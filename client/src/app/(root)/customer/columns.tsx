"use client";

import CustomerForm from "@/components/CustomerForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Customer } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Customer>[] = [
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
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* View Button */}
          <Link href={`/customer/${customer.id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View customer</span>
            </Button>
          </Link>

          {/* Edit Button */}
          <CustomerForm title="Update Customer" description="Start by updating customer information to the system" icon={<Edit size={40} />} customer={customer} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>Copy customer ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/customers/${customer.id}/accounts`} className="w-full">
                  View accounts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 120,
  },
];
