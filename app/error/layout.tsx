import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | N'adair Tours",
  description: "An error occurred",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
