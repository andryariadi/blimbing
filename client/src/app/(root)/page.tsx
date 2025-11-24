import CardHome from "@/components/CardHome";
import HowItWorks from "@/components/HowItWorks";
import { cacheLife } from "next/cache";

export default async function HomeDashboard() {
  "use cache";
  cacheLife("max");

  return (
    <div className="page b-rose-600">
      <div className="b-green-600 container space-y-7">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Bank Saving System</h1>
          <p className="text-muted-foreground mt-4 text-lg">Manage customer accounts, deposits, and investment returns</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <CardHome />
        </div>

        {/* How it works */}
        <HowItWorks />
      </div>
    </div>
  );
}
