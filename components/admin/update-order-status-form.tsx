"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/lib/types/order";

type UpdateOrderStatusFormProps = {
  orderId: number;
  currentStatus: OrderStatus;
};

export function UpdateOrderStatusForm({
  orderId,
  currentStatus,
}: UpdateOrderStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateOrderStatus(orderId, status);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as OrderStatus);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Status"}
      </Button>
    </form>
  );
}
