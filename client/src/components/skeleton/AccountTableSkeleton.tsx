// components/AccountTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AccountTableSkeleton() {
  return (
    <div className="rounded-md border">
      {/* Table Header Skeleton */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* Select Checkbox Header */}
            <TableHead style={{ width: 10 }}>
              <Skeleton className="h-4 w-4" />
            </TableHead>

            {/* Account ID Header */}
            <TableHead style={{ width: 100 }}>
              <Skeleton className="h-4 w-20" />
            </TableHead>

            {/* Customer Name Header */}
            <TableHead style={{ width: 100 }}>
              <Skeleton className="h-4 w-24" />
            </TableHead>

            {/* Deposito Type Header */}
            <TableHead style={{ width: 100 }}>
              <Skeleton className="h-4 w-28" />
            </TableHead>

            {/* Balance Header */}
            <TableHead style={{ width: 100 }}>
              <Skeleton className="h-4 w-16" />
            </TableHead>

            {/* Created Header */}
            <TableHead style={{ width: 100 }}>
              <Skeleton className="h-4 w-20" />
            </TableHead>

            {/* Actions Header */}
            <TableHead style={{ width: 100 }} className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Skeleton Rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {/* Select Checkbox Cell */}
              <TableCell style={{ width: 10 }}>
                <Skeleton className="h-4 w-4" />
              </TableCell>

              {/* Account ID Cell */}
              <TableCell style={{ width: 100 }}>
                <Skeleton className="h-3 w-16" />
              </TableCell>

              {/* Customer Name Cell */}
              <TableCell style={{ width: 100 }}>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Deposito Type Cell */}
              <TableCell style={{ width: 100 }}>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </TableCell>

              {/* Balance Cell */}
              <TableCell style={{ width: 100 }}>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Created Cell */}
              <TableCell style={{ width: 100 }}>
                <Skeleton className="h-3 w-16" />
              </TableCell>

              {/* Actions Cell */}
              <TableCell style={{ width: 100 }} className="text-right">
                <Skeleton className="h-8 w-8 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
