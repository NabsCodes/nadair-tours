"use client";

import { useCart } from "@/store/cart";
import { Badge } from "@/components/ui/badge";

export function MobileCartBadge() {
  const totalItems = useCart((state) => state.getTotalItems());

  if (totalItems <= 0) return null;

  return (
    <Badge variant="secondary">{totalItems > 99 ? "99+" : totalItems}</Badge>
  );
}
