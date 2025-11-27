import { db } from "./index";
import { orders, tours } from "./schema";
import { desc, eq, count, sql } from "drizzle-orm";

export async function getOrdersPaginated(
  page: number = 1,
  limit: number = 15,
  status?: string,
) {
  const offset = (page - 1) * limit;

  let query = db.select().from(orders);

  if (status && status !== "all") {
    query = query.where(eq(orders.status, status)) as typeof query;
  }

  const allOrders = await query
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(orders);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    orders: allOrders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function getOrderById(id: number) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);
  return order || null;
}

export async function getToursPaginatedAdmin(
  page: number = 1,
  limit: number = 10,
) {
  const offset = (page - 1) * limit;
  const allTours = await db
    .select()
    .from(tours)
    .orderBy(desc(tours.createdAt))
    .limit(limit)
    .offset(offset);

  const [{ totalCount }] = await db.select({ totalCount: count() }).from(tours);

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
}

export async function getAdminStats() {
  const [tourStats] = await db.select({ count: count() }).from(tours);

  const [orderStats] = await db.select({ count: count() }).from(orders);

  const [pendingStats] = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.status, "pending"));

  const [revenueStats] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${orders.totalPrice}::numeric), 0)`,
    })
    .from(orders)
    .where(eq(orders.status, "confirmed"));

  return {
    totalTours: Number(tourStats.count),
    totalOrders: Number(orderStats.count),
    pendingOrders: Number(pendingStats.count),
    revenue: Number(revenueStats.total) || 0,
  };
}
