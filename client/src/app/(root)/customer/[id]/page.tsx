import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomerDetail from "@/components/CustomerDetail";
import { Suspense } from "react";
import { CustomerDetailSkeleton } from "@/components/skeleton/CutomerDetailSkeleton";
import CustomerAccountTable from "@/components/CustomerAccountTable";
import CustomerAccountTableSkeleton from "@/components/skeleton/CustomerAccountsSkeleton";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Link href="/customer">
          <Button variant="outline" className="mb-6 bg-transparent">
            Back to Customers
          </Button>
        </Link>

        <div className="grid gap-6">
          <Suspense fallback={<CustomerDetailSkeleton />}>
            <CustomerDetail params={params} />
          </Suspense>

          <Suspense fallback={<CustomerAccountTableSkeleton />}>
            <CustomerAccountTable params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
