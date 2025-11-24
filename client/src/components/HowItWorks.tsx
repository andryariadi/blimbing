import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { howItWorksMenu } from "@/lib/constants";

const HowItWorks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How it works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {howItWorksMenu.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="shrink-0 rounded-full w-8 h-8 border border-border flex items-center justify-center font-semibold text-sm">{item.id}</div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;
