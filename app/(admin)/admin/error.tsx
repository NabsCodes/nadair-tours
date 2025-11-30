"use client";

import { useEffect } from "react";
import { Error } from "@/components/ui/error";
import { AlertCircle } from "lucide-react";
import { FaRedo, FaHome } from "react-icons/fa";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Error
      title="Admin Error"
      subtitle="An error occurred in the admin panel"
      description="An error occurred while processing your request. Please try again or return to the dashboard."
      error={error}
      icon={AlertCircle}
      iconColor="destructive"
      primaryAction={{
        label: "Try Again",
        onClick: reset,
        icon: FaRedo,
        variant: "default",
      }}
      secondaryAction={{
        label: "Go to Dashboard",
        href: "/admin",
        icon: FaHome,
        variant: "outline",
      }}
    />
  );
}
