"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

export function ClearCartOnMount() {
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
