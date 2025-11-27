"use server";

import { db } from "@/lib/db";
import { tours } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-helpers";
import { tourSchema } from "@/lib/validations";
import { z } from "zod";

type TourInput = z.infer<typeof tourSchema>;

export async function createTour(input: TourInput) {
  try {
    await requireAuth();

    const validated = tourSchema.parse(input);

    const [tour] = await db
      .insert(tours)
      .values({
        title: validated.title,
        description: validated.description,
        price: validated.price,
        duration: validated.duration,
        location: validated.location,
        itinerary: validated.itinerary,
        images: validated.images,
        sdgGoals: validated.sdgGoals,
        maxCapacity: validated.maxCapacity,
      })
      .returning();

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath("/");

    return { success: true, tour };
  } catch (error) {
    console.error("Error creating tour:", error);
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      throw new Error(`Validation error: ${messages}`);
    }
    throw new Error("Failed to create tour");
  }
}

export async function updateTour(id: number, input: TourInput) {
  try {
    await requireAuth();

    const validated = tourSchema.parse(input);

    const [updated] = await db
      .update(tours)
      .set({
        title: validated.title,
        description: validated.description,
        price: validated.price,
        duration: validated.duration,
        location: validated.location,
        itinerary: validated.itinerary,
        images: validated.images,
        sdgGoals: validated.sdgGoals,
        maxCapacity: validated.maxCapacity,
        updatedAt: new Date(),
      })
      .where(eq(tours.id, id))
      .returning();

    if (!updated) {
      throw new Error("Tour not found");
    }

    revalidatePath("/admin/tours");
    revalidatePath(`/admin/tours/${id}`);
    revalidatePath("/tours");
    revalidatePath(`/tours/${id}`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error updating tour:", error);
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message).join(", ");
      throw new Error(`Validation error: ${messages}`);
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to update tour",
    );
  }
}

export async function deleteTour(id: number) {
  try {
    await requireAuth();

    const [deleted] = await db
      .delete(tours)
      .where(eq(tours.id, id))
      .returning();

    if (!deleted) {
      throw new Error("Tour not found");
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete tour",
    );
  }
}
