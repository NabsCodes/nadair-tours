import Link from "next/link";
import type { Metadata } from "next";
import { TourCard } from "@/components/tours/tour-card";
import { getToursPaginated } from "@/lib/db/queries";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Tours | N'adair Tours",
  description:
    "Discover our complete collection of sustainable Scottish adventures. From Highland hikes to coastal explorations, find your perfect eco-conscious tour.",
  openGraph: {
    title: "All Tours | N'adair Tours",
    description:
      "Discover our complete collection of sustainable Scottish adventures.",
    type: "website",
  },
};

type SearchParams = {
  page?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ToursPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { tours, pagination } = await getToursPaginated(currentPage, 9);

  return (
    <div className="container mx-auto space-y-12 px-4 py-16">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          All Tours
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Discover our complete collection of sustainable Scottish adventures
        </p>
      </div>

      {tours.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                asChild
                variant="outline"
                disabled={!pagination.hasPrev}
                className={!pagination.hasPrev ? "opacity-50" : ""}
              >
                <Link
                  href={`/tours?page=${pagination.currentPage - 1}`}
                  className={!pagination.hasPrev ? "pointer-events-none" : ""}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              </Button>

              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>

              <Button
                asChild
                variant="outline"
                disabled={!pagination.hasNext}
                className={!pagination.hasNext ? "opacity-50" : ""}
              >
                <Link
                  href={`/tours?page=${pagination.currentPage + 1}`}
                  className={!pagination.hasNext ? "pointer-events-none" : ""}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tours available yet.</p>
        </div>
      )}
    </div>
  );
}
