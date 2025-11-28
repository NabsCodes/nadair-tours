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
import { FaPoundSign } from "react-icons/fa";

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
    <Card className="border-border sticky top-24">
      <CardHeader className="space-y-1">
        <CardTitle className="font-heading text-xl font-semibold">
          Order Summary
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.tourId}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <div className="flex-1 space-y-0.5">
                <div className="text-foreground leading-tight font-medium">
                  {item.tourTitle}
                </div>
                <div className="text-muted-foreground text-xs">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="text-primary flex items-center gap-0.5 font-semibold">
                <FaPoundSign className="h-3 w-3" />
                <span>
                  {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">
              Subtotal
            </span>
            <div className="text-foreground flex items-center gap-0.5 font-semibold">
              <FaPoundSign className="h-4 w-4" />
              <span className="text-lg">{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-border flex items-center justify-between border-t pt-2">
            <span className="text-foreground text-base font-semibold">
              Total
            </span>
            <div className="text-primary flex items-center gap-1 text-2xl font-bold">
              <FaPoundSign className="h-5 w-5" />
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {(showCheckoutButton || showClearButton) && (
        <CardFooter className="border-border flex flex-col gap-3 border-t pt-6">
          {showCheckoutButton && onCheckout && (
            <Button
              className="h-12 w-full text-base font-semibold"
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
