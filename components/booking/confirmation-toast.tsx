"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

type ConfirmationToastProps = {
  orderId: number;
  customerName?: string;
};

export function ConfirmationToast({
  orderId,
  customerName,
}: ConfirmationToastProps) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;

    hasShownToast.current = true;
    toast.success("Booking Confirmed!", {
      description: customerName
        ? `Thank you ${customerName}! Your order #${orderId} has been confirmed.`
        : `Your order #${orderId} has been confirmed successfully.`,
      duration: 5000,
    });
  }, [orderId, customerName]);

  return null;
}
