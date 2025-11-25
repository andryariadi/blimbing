import { Suspense } from "react";
import { getAccounts } from "@/lib/actions/account.action";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AccountTableSkeleton } from "@/components/skeleton/AccountTableSkeleton";
import AccountForm from "@/components/AccountForm";
import { UserPlus } from "lucide-react";

async function AccountTableContent() {
  const accounts = await getAccounts();

  return <DataTable columns={columns} data={accounts} />;
}

const AccountPage = async () => {
  return (
    <div className="b-sky-500 page space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary rounded-md">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Accounts</h1>
          <p className="text-sm text-muted-foreground">Manage customer accounts</p>
        </div>

        <div>
          <AccountForm title="Create Account" description="Start by adding account information to the system." icon={<UserPlus />} />
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<AccountTableSkeleton />}>
        <AccountTableContent />
      </Suspense>
    </div>
  );
};

export default AccountPage;
