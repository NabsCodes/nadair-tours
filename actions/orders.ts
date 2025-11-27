"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { bookingSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { CartItem } from "@/lib/types/cart";

type CreateOrderInput = z.infer<typeof bookingSchema> & {
  cartItems: CartItem[];
};

export async function createOrder(input: CreateOrderInput) {
  try {
    if (!input.cartItems || input.cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const validated = bookingSchema.parse({
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      customerAddress: input.customerAddress,
      bookingDate: input.bookingDate,
      notes: input.notes,
    });

    const totalPrice = input.cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0,
    );

    const tourItems = input.cartItems.map((item) => ({
      tourId: item.tourId,
      tourTitle: item.tourTitle,
      quantity: item.quantity,
      price: item.price,
    }));

    const [order] = await db
      .insert(orders)
      .values({
        customerName: validated.customerName,
        customerEmail: validated.customerEmail,
        customerPhone: validated.customerPhone,
        customerAddress: validated.customerAddress || null,
        bookingDate: validated.bookingDate.toISOString().split("T")[0],
        notes: validated.notes || null,
        tourItems,
        totalPrice: totalPrice.toString(),
        status: "pending",
      })
      .returning();

    if (!order) {
      throw new Error("Failed to create order");
    }

    revalidatePath("/admin/orders");
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      throw new Error(`Validation error: ${messages}`);
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to create order",
    );
  }
}
