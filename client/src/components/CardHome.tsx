import { ArrowRight, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { cardsMenu } from "@/lib/constants";

const CardHome = () => {
  return (
    <>
      {cardsMenu.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {card.title}
            </CardTitle>
            <CardDescription>{card.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
            <Link href={card.url}>
              <Button className="w-full">
                {card.link} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardHome;
