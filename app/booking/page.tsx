"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrder } from "@/actions/orders";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { OrderSummary } from "@/components/cart/order-summary";
import { BookingForm } from "@/components/booking/booking-form";
import type { z } from "zod";
import { bookingSchema } from "@/lib/validations";

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-16">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>
              Please add tours to your cart before booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/tours">Browse Tours</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const order = await createOrder({
        ...data,
        cartItems: items,
      });

      router.push(`/booking/confirmation?orderId=${order.id}`);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-16">
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          Complete Your Booking
        </h1>
        <p className="text-muted-foreground">
          Please provide your details to complete your booking
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
