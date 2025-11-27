import { db } from "./index";
import { tours } from "./schema";
import { desc, eq, count } from "drizzle-orm";

export async function getFeaturedTours(limit: number = 6) {
  try {
    return await db
      .select()
      .from(tours)
      .orderBy(desc(tours.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    return [];
  }
}

export async function getAllTours() {
  try {
    return await db.select().from(tours).orderBy(desc(tours.createdAt));
  } catch (error) {
    console.error("Error fetching all tours:", error);
    return [];
  }
}

export async function getTourById(id: number) {
  try {
    if (!id || isNaN(id)) {
      return null;
    }
    const [tour] = await db
      .select()
      .from(tours)
      .where(eq(tours.id, id))
      .limit(1);
    return tour || null;
  } catch (error) {
    console.error("Error fetching tour by id:", error);
    return null;
  }
}

export async function getToursPaginated(page: number = 1, limit: number = 9) {
  try {
    const offset = (page - 1) * limit;
    const allTours = await db
      .select()
      .from(tours)
      .orderBy(desc(tours.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(tours);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      tours: allTours,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated tours:", error);
    return {
      tours: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}
