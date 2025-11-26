import { getAccount } from "@/lib/actions/account.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/lib/types";
import TransactionForm from "./TransactionForm";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

const AccountDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const account: Account = await getAccount(id);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-mono text-lg">{account.id}</CardTitle>
            <CardDescription className="mt-2">{account.customer?.name}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Deposito Type and Yearly Return */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Deposito Type</p>
            <p className="font-semibold">{account.packet?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Yearly Return</p>
            <p className="font-semibold">{account.packet?.yearlyReturn}% per year</p>
          </div>
        </div>

        {/* Current Balance */}
        <div>
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
        </div>

        {/* Deposit and Withdraw Form */}
        <div className="flex gap-3">
          <TransactionForm title="Deposit" description="Deposit money into your account" icon={<BanknoteArrowUp />} account={account} />

          <TransactionForm title="Withdraw" description="Withdraw money from your account" icon={<BanknoteArrowDown />} account={account} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountDetail;
