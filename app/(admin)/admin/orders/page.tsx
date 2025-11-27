import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-helpers";
import { getOrdersPaginated } from "@/lib/db/queries-admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { OrderStatusFilter } from "@/components/admin/order-status-filter";

export const metadata: Metadata = {
  title: "Manage Orders | N'adair Tours",
  description: "View and manage customer orders",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = {
  page?: string;
  status?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

import type { OrderStatus } from "@/lib/types/order";

const statusColors: Record<
  OrderStatus,
  "secondary" | "default" | "destructive"
> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
};

export default async function AdminOrdersPage({ searchParams }: Props) {
  await requireAuth();
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const status = params.status || "all";
  const { orders, pagination } = await getOrdersPaginated(
    currentPage,
    15,
    status,
  );

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <OrderStatusFilter />
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <p className="text-muted-foreground">No orders found</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell>
                    £{parseFloat(order.totalPrice).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(order.bookingDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusColors[
                          order.status as keyof typeof statusColors
                        ] || "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            disabled={!pagination.hasPrev}
            className={!pagination.hasPrev ? "opacity-50" : ""}
          >
            <Link
              href={`/admin/orders?page=${pagination.currentPage - 1}&status=${status}`}
              className={!pagination.hasPrev ? "pointer-events-none" : ""}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>

          <Button
            asChild
            variant="outline"
            disabled={!pagination.hasNext}
            className={!pagination.hasNext ? "opacity-50" : ""}
          >
            <Link
              href={`/admin/orders?page=${pagination.currentPage + 1}&status=${status}`}
              className={!pagination.hasNext ? "pointer-events-none" : ""}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
