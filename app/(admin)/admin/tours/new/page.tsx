import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { TourForm } from "@/components/admin/tour-form";

export const metadata: Metadata = {
  title: "Create New Tour | N'adair Tours",
  description: "Add a new tour package to the system",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewTourPage() {
  await requireAuth();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="font-heading text-4xl font-bold">Create New Tour</h1>
        <p className="text-muted-foreground">Add a new tour package</p>
      </div>

      <TourForm />
    </div>
  );
}
