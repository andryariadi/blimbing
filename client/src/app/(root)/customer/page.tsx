import { getCustomers } from "@/lib/actions/customer.action";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function CustomerTableContent() {
  const customers = await getCustomers();

  //   console.log({ customers }, "<---customerPage");

  return <DataTable columns={columns} data={customers} />;
}

const CustomerPage = async () => {
  return (
    <div className="b-sky-500 page space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary rounded-md">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage customer accounts</p>
        </div>

        <Link href="/customers/create">
          <Button variant="outline">Add Customer</Button>
        </Link>
      </div>

      {/* Table */}
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomerTableContent />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
