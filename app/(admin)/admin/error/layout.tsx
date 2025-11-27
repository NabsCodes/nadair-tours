import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Error | N'adair Tours",
  description: "An error occurred in the admin panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
