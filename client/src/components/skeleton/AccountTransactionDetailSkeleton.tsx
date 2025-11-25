// components/TransactionTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AccountTransactionDetailSkeleton() {
  return (
    <div className="rounded-md border">
      {/* Table Header Skeleton */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* Select Checkbox Header - Kolom 1 */}
            <TableHead style={{ width: 40 }}>
              <Skeleton className="h-4 w-4 rounded" />
            </TableHead>

            {/* Type Header - Kolom 2 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-16" />
            </TableHead>

            {/* Amount Header - Kolom 3 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-20" />
            </TableHead>

            {/* Transaction Date Header - Kolom 4 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-32" />
            </TableHead>

            {/* Starting Balance Header - Kolom 5 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-28" />
            </TableHead>

            {/* Ending Balance Header - Kolom 6 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-28" />
            </TableHead>

            {/* Interest Earned Header - Kolom 7 */}
            <TableHead style={{ width: 120 }}>
              <Skeleton className="h-4 w-24" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Skeleton Rows - 5 baris */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {/* Select Checkbox Cell - Kolom 1 */}
              <TableCell style={{ width: 40 }}>
                <Skeleton className="h-4 w-4 rounded" />
              </TableCell>

              {/* Type Cell - Kolom 2 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>

              {/* Amount Cell - Kolom 3 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-5 w-24" />
              </TableCell>

              {/* Transaction Date Cell - Kolom 4 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Starting Balance Cell - Kolom 5 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              {/* Ending Balance Cell - Kolom 6 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-5 w-20" />
              </TableCell>

              {/* Interest Earned Cell - Kolom 7 */}
              <TableCell style={{ width: 120 }}>
                <Skeleton className="h-4 w-16" />
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
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  );
}
