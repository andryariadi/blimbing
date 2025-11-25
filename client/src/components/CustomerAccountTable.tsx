// app/(root)/customer/[id]/CustomerAccountTable.tsx
import { getCustomer } from "@/lib/actions/customer.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "@/app/(root)/customer/[id]/columns";
import { DataTable } from "@/app/(root)/customer/[id]/data-table";

const CustomerAccountTable = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const customer = await getCustomer(id);

  //   const totalBalance = customer.accounts?.reduce((sum: number, account: Account) => sum + account.balance, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>Accounts</CardTitle>
            <CardDescription>Accounts owned by this customer</CardDescription>
          </div>
          <Link href="/accounts/create">
            <Button size="sm">Create Account</Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        {customer.accounts && customer.accounts.length > 0 ? (
          <DataTable columns={columns} data={customer.accounts} />
        ) : (
          <div className="flex flex-col text-center py-8 space-y-2">
            <span className="text-muted-foreground">No accounts found for this customer</span>
            <span>Create an account using the button above</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerAccountTable;
