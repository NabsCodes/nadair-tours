"use client";

import { useEffect } from "react";
import { Error } from "@/components/ui/error";
import { AlertCircle } from "lucide-react";
import { FaRedo, FaHome } from "react-icons/fa";

export default function ErrorPage({
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
      title="Something went wrong!"
      subtitle="We encountered an unexpected error"
      description="An unexpected error occurred while processing your request. Please try again or return home."
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
        label: "Go Home",
        href: "/",
        icon: FaHome,
        variant: "outline",
      }}
    />
  );
}
