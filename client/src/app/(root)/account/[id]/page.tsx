import AccountDetail from "@/components/AccountDetail";
import AccountTransactionsTable from "@/components/AccountTransactionsTable";
import { AccountDetailSkeleton } from "@/components/skeleton/AccountDetailSkeleton";
import { AccountTransactionDetailSkeleton } from "@/components/skeleton/AccountTransactionDetailSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const AccountDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Link href="/account">
          <Button variant="outline" className="mb-6 bg-transparent">
            Back to Accounts
          </Button>
        </Link>

        <div className="grid gap-6">
          <Suspense fallback={<AccountDetailSkeleton />}>
            <AccountDetail params={params} />
          </Suspense>

          <Suspense fallback={<AccountTransactionDetailSkeleton />}>
            <AccountTransactionsTable params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
