import { getAccount } from "@/lib/actions/account.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DataTable } from "@/app/(root)/account/[id]/data-table";
import { columns } from "@/app/(root)/account/[id]/columns";

const AccountTransactionsTable = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const account = await getAccount(id);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>All transactions for this account</CardDescription>
          </div>
          {/* <Link href="/accounts/create">
            <Button size="sm">Create Account</Button>
          </Link> */}
        </div>
      </CardHeader>

      <CardContent>
        {account.transactions && account.transactions.length > 0 ? (
          <DataTable columns={columns} data={account.transactions} />
        ) : (
          <div className="flex flex-col text-center py-8 space-y-2">
            <span className="text-muted-foreground">No transactions found for this account</span>
            <span>Create a transaction using the button above</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountTransactionsTable;
