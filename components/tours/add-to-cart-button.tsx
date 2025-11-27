"use client";

import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { Tour } from "@/lib/types/tour";

type AddToCartButtonProps = {
  tour: Pick<Tour, "id" | "title" | "price" | "duration" | "images">;
};

export function AddToCartButton({ tour }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      tourId: tour.id,
      tourTitle: tour.title,
      price: tour.price,
      duration: tour.duration,
      image: tour.images?.[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-full"
      disabled={added}
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
