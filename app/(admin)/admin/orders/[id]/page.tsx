import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { getOrderById } from "@/lib/db/queries-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, MapPin } from "lucide-react";
import { UpdateOrderStatusForm } from "@/components/admin/update-order-status-form";
import Link from "next/link";
import type { OrderStatus } from "@/lib/types/order";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await requireAuth();
  const { id } = await params;
  const order = await getOrderById(Number(id));

  if (!order) {
    return {
      title: "Order Not Found | Admin | N'adair Tours",
      robots: {
        index: false,
      },
    };
  }

  return {
    title: `Order #${order.id} | Admin | N'adair Tours`,
    description: `View and manage order #${order.id} details`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const statusColors: Record<
  OrderStatus,
  "secondary" | "default" | "destructive"
> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
} as const;

export default async function AdminOrderDetailsPage({ params }: Props) {
  await requireAuth();
  const { id } = await params;
  const order = await getOrderById(Number(id));

  if (!order) {
    notFound();
  }

  const tourItems = order.tourItems as Array<{
    tourId: number;
    tourTitle: string;
    quantity: number;
    price: string;
  }>;

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">View and manage order details</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/orders">Back to Orders</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span>{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground h-4 w-4" />
                <span>{order.customerPhone}</span>
              </div>
              {order.customerAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                  <span>{order.customerAddress}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span>
                  {new Date(order.bookingDate).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tourItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.tourTitle}</p>
                      <p className="text-muted-foreground text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-primary font-semibold">
                      £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    £{parseFloat(order.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Update the order status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Current Status:</span>
                <Badge
                  variant={
                    statusColors[order.status as OrderStatus] || "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <UpdateOrderStatusForm
                orderId={order.id}
                currentStatus={(order.status as OrderStatus) || "pending"}
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>
                  {new Date(order.updatedAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
