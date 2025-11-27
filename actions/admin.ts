"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-helpers";

export async function updateOrderStatus(
  orderId: number,
  status: "pending" | "confirmed" | "cancelled",
) {
  await requireAuth();

  await db
    .update(orders)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return { success: true };
}
