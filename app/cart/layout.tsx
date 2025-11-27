import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | N'adair Tours",
  description:
    "Review your selected sustainable tours. Complete your booking to secure your eco-conscious Scottish adventure.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
