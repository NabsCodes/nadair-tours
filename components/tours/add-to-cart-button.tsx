"use client";

import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { FaShoppingCart, FaCheck, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import type { Tour } from "@/lib/types/tour";

type AddToCartButtonProps = {
  tour: Pick<Tour, "id" | "title" | "price" | "duration" | "images">;
};

export function AddToCartButton({ tour }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const items = useCart((state) => state.items);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const existingItem = items.find((item) => item.tourId === tour.id);
  const isInCart = !!existingItem;

  const handleAddToCart = async () => {
    setIsLoading(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      addItem({
        tourId: tour.id,
        tourTitle: tour.title,
        price: tour.price,
        duration: tour.duration,
        image: tour.images?.[0],
      });

      setIsAdded(true);
      toast.success("Added to cart", {
        description: `${tour.title} has been added to your cart.`,
      });

      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch {
      toast.error("Failed to add to cart", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="h-12 w-full text-base font-semibold"
      disabled={isLoading || isAdded}
    >
      {isLoading ? (
        <>
          <FaSpinner className="mr-2 h-5 w-5 animate-spin" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <FaCheck className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : isInCart ? (
        <>
          <FaCheck className="mr-2 h-5 w-5" />
          In Cart ({existingItem.quantity})
        </>
      ) : (
        <>
          <FaShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
