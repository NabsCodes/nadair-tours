import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaShoppingBag, FaCompass } from "react-icons/fa";

export function EmptyCartState() {
  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader className="space-y-3 pb-4">
        <div className="relative mx-auto">
          <div className="bg-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl">
            <FaShoppingBag className="text-primary h-10 w-10" />
          </div>
          <div className="bg-primary/5 absolute -inset-2 -z-10 rounded-2xl blur-xl" />
        </div>
        <div className="space-y-2">
          <CardTitle className="font-heading text-3xl font-bold">
            Your Cart is Empty
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Ready to start your Scottish adventure?
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground leading-relaxed">
          Start exploring our sustainable tours and add them to your cart.
          Discover amazing Scottish adventures waiting for you!
        </p>
        <Button asChild className="w-full gap-2" size="lg">
          <Link href="/tours">
            <FaCompass className="h-4 w-4" />
            Browse Tours
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
