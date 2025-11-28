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
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ClearCartOnMount } from "@/components/cart/clear-cart-on-mount";
import { ConfirmationToast } from "@/components/booking/confirmation-toast";

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
      <ConfirmationToast orderId={order.id} customerName={order.customerName} />
      <div className="container mx-auto space-y-8 px-4 py-16">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="relative mx-auto flex justify-center">
            <div className="bg-primary/10 flex h-24 w-24 items-center justify-center rounded-2xl">
              <FaCheckCircle className="text-primary h-12 w-12" />
            </div>
            <div className="bg-primary/5 absolute -inset-2 -z-10 rounded-2xl blur-xl" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your booking. We've sent a confirmation email to{" "}
              <span className="text-foreground font-medium">
                {order.customerEmail}
              </span>
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b-border border-b">
              <CardTitle className="font-heading text-2xl">
                Order Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Order #{order.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pb-6">
                <h3 className="font-heading text-lg font-semibold">
                  Customer Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <FaEnvelope className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-foreground">
                      {order.customerEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <FaPhone className="text-secondary h-5 w-5" />
                    </div>
                    <span className="text-foreground">
                      {order.customerPhone}
                    </span>
                  </div>
                  {order.customerAddress && (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg">
                        <FaMapMarkerAlt className="text-primary h-5 w-5" />
                      </div>
                      <span className="text-foreground">
                        {order.customerAddress}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <FaCalendarAlt className="text-secondary h-5 w-5" />
                    </div>
                    <span className="text-foreground">
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
                      className="border-border flex items-center justify-between rounded-lg border p-4 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-foreground font-medium">
                          {item.tourTitle}
                        </p>
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
                <div className="border-t-border mt-6 flex items-center justify-between border-t pt-4">
                  <span className="text-foreground text-lg font-bold">
                    Total
                  </span>
                  <span className="text-primary text-xl font-bold">
                    £{parseFloat(order.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {order.notes && (
                <div className="border-t pt-6">
                  <h3 className="font-heading mb-3 text-lg font-semibold">
                    Notes
                  </h3>
                  <div className="bg-muted/30 border-border rounded-lg border p-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {order.notes}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-muted/30 border-border mt-6 rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    Status:
                  </span>
                  <span className="text-foreground font-semibold capitalize">
                    {order.status
                      ? order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)
                      : "Pending"}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  We'll contact you soon to confirm the details of your booking.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="flex-1" size="lg">
              <Link href="/tours">Book Another Tour</Link>
            </Button>
            <Button asChild className="flex-1" size="lg">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
