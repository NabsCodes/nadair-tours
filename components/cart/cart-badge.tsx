"use client";

import { useCart } from "@/store/cart";
import { Badge } from "@/components/ui/badge";

export function CartBadge() {
  const totalItems = useCart((state) => state.getTotalItems());

  if (totalItems <= 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
    >
      {totalItems > 99 ? "99+" : totalItems}
    </Badge>
  );
}
