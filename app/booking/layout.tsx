import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Booking | N'adair Tours",
  description:
    "Provide your details to complete your booking for sustainable Scottish tours. Secure your eco-conscious adventure today.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
