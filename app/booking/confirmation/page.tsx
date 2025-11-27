import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Calendar, Mail, Phone, MapPin } from "lucide-react";
import { ClearCartOnMount } from "@/components/cart/clear-cart-on-mount";

export const metadata: Metadata = {
  title: "Booking Confirmed | N'adair Tours",
  description:
    "Your booking has been confirmed! Thank you for choosing sustainable tourism in Scotland.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = {
  orderId?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function BookingConfirmationPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    notFound();
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, Number(orderId)))
    .limit(1);

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
    <>
      <ClearCartOnMount />
      <div className="container mx-auto space-y-8 px-4 py-16">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <CheckCircle2 className="text-primary h-16 w-16" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your booking. We've sent a confirmation email to{" "}
              {order.customerEmail}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{order.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold">
                  Customer Information
                </h3>
                <div className="space-y-3">
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
                      Booking Date:{" "}
                      {new Date(order.bookingDate).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-heading mb-4 text-lg font-semibold">
                  Booked Tours
                </h3>
                <div className="space-y-3">
                  {tourItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded-lg border p-3"
                    >
                      <div>
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
                </div>
                <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    £{parseFloat(order.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {order.notes && (
                <div className="border-t pt-6">
                  <h3 className="font-heading mb-2 text-lg font-semibold">
                    Notes
                  </h3>
                  <p className="text-muted-foreground">{order.notes}</p>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">
                  <strong>Status:</strong>{" "}
                  {order.status
                    ? order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    : "Pending"}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  We'll contact you soon to confirm the details of your booking.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/tours">Book Another Tour</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
