"use client";

import Link from "next/link";
import { TourImage } from "@/components/ui/tour-image";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { EmptyCartState } from "@/components/cart/empty-cart-state";
import { OrderSummary } from "@/components/cart/order-summary";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const clearCart = useCart((state) => state.clearCart);

  const handleQuantityChange = (tourId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(tourId);
      toast.success("Item removed", {
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(tourId, newQuantity);
    }
  };

  const handleRemoveItem = (tourId: number, title: string) => {
    removeItem(tourId);
    toast.success("Item removed", {
      description: `${title} has been removed from your cart.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-16">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Your Cart
          </h1>
        </div>

        <EmptyCartState />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-16">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Your Cart
        </h1>
        <p className="text-muted-foreground mt-1">
          {items.length} {items.length === 1 ? "tour" : "tours"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card
              key={item.tourId}
              className="border-border hover:border-primary/50 overflow-hidden transition-all"
            >
              <CardContent className="flex gap-6">
                <Link
                  href={`/tours/${item.tourId}`}
                  className="group relative h-32 w-32 shrink-0 overflow-hidden rounded-xl"
                >
                  <TourImage
                    src={item.image || ""}
                    alt={item.tourTitle}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="128px"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/tours/${item.tourId}`}
                          className="font-heading hover:text-primary text-lg leading-tight font-semibold transition-colors"
                        >
                          {item.tourTitle}
                        </Link>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {item.duration}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemoveItem(item.tourId, item.tourTitle)
                        }
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive h-9 w-9 shrink-0"
                        aria-label="Remove item"
                      >
                        <FaTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-border flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-sm font-medium">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() =>
                            handleQuantityChange(item.tourId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="text-foreground w-10 text-center text-base font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() =>
                            handleQuantityChange(item.tourId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-primary text-xl font-bold">
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
