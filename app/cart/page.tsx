"use client";

import Link from "next/link";
import { TourImage } from "@/components/ui/tour-image";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmptyCartState } from "@/components/cart/empty-cart-state";
import { OrderSummary } from "@/components/cart/order-summary";

export default function CartPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const clearCart = useCart((state) => state.clearCart);

  const handleQuantityChange = (tourId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(tourId);
    } else {
      updateQuantity(tourId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-16">
        <div className="space-y-4 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Your Cart
          </h1>
        </div>

        <EmptyCartState />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-16">
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          Your Cart
        </h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "tour" : "tours"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.tourId}>
              <CardContent className="flex gap-4 p-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <TourImage
                    src={item.image || ""}
                    alt={item.tourTitle}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <Link
                        href={`/tours/${item.tourId}`}
                        className="font-heading hover:text-primary text-lg font-semibold transition-colors"
                      >
                        {item.tourTitle}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.tourId)}
                        className="text-destructive hover:text-destructive h-8 w-8"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {item.duration}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.tourId, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.tourId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-primary font-semibold">
                      £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            showCheckoutButton
            onCheckout={() => router.push("/booking")}
            showClearButton
            onClear={() => {
              clearCart();
              router.push("/tours");
            }}
          />
        </div>
      </div>
    </div>
  );
}
