import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | N'adair Tours",
  description: "Sign in to manage tours and orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page doesn't need the admin sidebar, so it bypasses the admin layout
  return <div className="min-h-screen">{children}</div>;
}
