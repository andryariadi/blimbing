import { Skeleton } from "@/components/ui/skeleton";

const CustomerAccountTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Card Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        {/* Table Header */}
        <div className="flex p-4 border-b">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className={`h-4 ${index === 0 ? "w-8" : index === 1 ? "w-20" : index === 5 ? "w-16" : "w-24"} mr-4`} />
          ))}
        </div>

        {/* Table Body */}
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <div key={cellIndex} className="flex-1 mr-4">
                  {cellIndex === 0 && <Skeleton className="h-4 w-4" />}
                  {cellIndex === 1 && <Skeleton className="h-3 w-16" />}
                  {cellIndex === 2 && (
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  )}
                  {cellIndex === 3 && <Skeleton className="h-4 w-16" />}
                  {cellIndex === 4 && <Skeleton className="h-3 w-20" />}
                  {cellIndex === 5 && <Skeleton className="h-8 w-8 ml-auto" />}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountTableSkeleton;
