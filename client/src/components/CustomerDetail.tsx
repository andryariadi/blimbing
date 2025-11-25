import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";
import { getCustomer } from "@/lib/actions/customer.action";

const CustomerDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const customer = await getCustomer(id);

  console.log({ customer }, "<---customerDetail");

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{customer.name}</CardTitle>
            <CardDescription className="font-mono text-sm mt-2">{customer.id}</CardDescription>
          </div>
          <Link href={`/customers/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-muted-foreground">Created:</span> {formatDate(customer.createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetail;
