import type { Metadata } from "next";
import { NotFound } from "@/components/ui/not-found";
import { FaMapMarkedAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Page Not Found | N'adair Tours",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page Not Found"
      subtitle="We couldn't find the page you're looking for"
      description="The page you're looking for doesn't exist or has been moved. But don't worry—there are plenty of amazing Scottish adventures waiting for you!"
      icon={FaMapMarkedAlt}
      iconColor="primary"
    />
  );
}
