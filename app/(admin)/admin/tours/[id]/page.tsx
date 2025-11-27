import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { getTourById } from "@/lib/db/queries";
import { TourForm } from "@/components/admin/tour-form";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await requireAuth();
  const { id } = await params;
  const tour = await getTourById(Number(id));

  if (!tour) {
    return {
      title: "Tour Not Found | N'adair Tours",
      robots: {
        index: false,
      },
    };
  }

  return {
    title: `Edit ${tour.title} | N'adair Tours`,
    description: `Update tour details for ${tour.title}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditTourPage({ params }: Props) {
  await requireAuth();
  const { id } = await params;
  const tour = await getTourById(Number(id));

  if (!tour) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="font-heading text-4xl font-bold">Edit Tour</h1>
        <p className="text-muted-foreground">Update tour details</p>
      </div>

      <TourForm tour={tour} />
    </div>
  );
}
