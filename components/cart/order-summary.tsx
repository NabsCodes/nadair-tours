"use client";

import { useCart } from "@/store/cart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type OrderSummaryProps = {
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  checkoutButtonText?: string;
  checkoutButtonDisabled?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
};

export function OrderSummary({
  showCheckoutButton = false,
  onCheckout,
  checkoutButtonText = "Proceed to Checkout",
  checkoutButtonDisabled = false,
  showClearButton = false,
  onClear,
}: OrderSummaryProps) {
  const items = useCart((state) => state.items);
  const getTotalPrice = useCart((state) => state.getTotalPrice);

  const total = getTotalPrice();

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.tourId} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.tourTitle} × {item.quantity}
              </span>
              <span className="font-medium">
                £{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">£{total.toFixed(2)}</span>
        </div>
      </CardContent>
      {(showCheckoutButton || showClearButton) && (
        <CardFooter className="flex flex-col gap-2">
          {showCheckoutButton && onCheckout && (
            <Button
              className="w-full"
              size="lg"
              onClick={onCheckout}
              disabled={checkoutButtonDisabled}
            >
              {checkoutButtonText}
            </Button>
          )}
          {showClearButton && onClear && (
            <Button variant="outline" className="w-full" onClick={onClear}>
              Clear Cart
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
