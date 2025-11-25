import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton";
import CustomerForm from "@/components/CustomerForm";
import { UserRoundPlus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getDepositoTypes } from "@/lib/actions/depositotype.action";
import DepositoTyperForm from "@/components/DepositoTypeForm";
import { DepositoTypeTableSkeleton } from "@/components/skeleton/DepositoTypeTableSkeleton";

async function DepositoTableContent() {
  const depositoTypes = await getDepositoTypes();

  //   console.log({ depositoTypes }, "<---depositoTypesPage");

  return <DataTable columns={columns} data={depositoTypes} />;
}

const DepositoTypesPage = async () => {
  return (
    <div className="b-sky-500 page space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary rounded-md">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Deposito Types</h1>
          <p className="text-sm text-muted-foreground">Manage deposito types</p>
        </div>

        <div>
          <DepositoTyperForm title="Create Deposito Type" description="Start by adding deposito type information to the system" icon={<UserRoundPlus />} />
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<DepositoTypeTableSkeleton />}>
        <DepositoTableContent />
      </Suspense>
    </div>
  );
};

export default DepositoTypesPage;
