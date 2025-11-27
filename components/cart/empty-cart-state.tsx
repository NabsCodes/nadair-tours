import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export function EmptyCartState() {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
        <ShoppingBag className="text-muted-foreground h-16 w-16" />
        <div className="space-y-2 text-center">
          <h3 className="font-heading text-xl font-semibold">
            Your cart is empty
          </h3>
          <p className="text-muted-foreground text-sm">
            Start exploring our sustainable tours
          </p>
        </div>
        <Button asChild>
          <Link href="/tours">Browse Tours</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
