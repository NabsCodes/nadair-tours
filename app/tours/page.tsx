import type { Metadata } from "next";
import { TourCard } from "@/components/tours/tour-card";
import { getToursPaginated } from "@/lib/db/queries";
import { Pagination } from "@/components/ui/pagination";

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
    <div className="container mx-auto space-y-16 px-4 py-20">
      {/* Header Section */}
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="bg-secondary h-px w-12" />
          <span className="text-secondary text-sm font-semibold tracking-wider uppercase">
            Explore
          </span>
          <span className="bg-secondary h-px w-12" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          All Tours
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          Discover our complete collection of sustainable Scottish adventures.
          From Highland hikes to coastal explorations, find your perfect
          eco-conscious tour.
        </p>
      </div>

      {/* Tours Grid */}
      {tours.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="border-border flex flex-col items-center gap-6 border-t pt-12">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                basePath="/tours"
              />
              <p className="text-muted-foreground text-sm">
                Showing page {pagination.currentPage} of {pagination.totalPages}
                {" • "}
                {pagination.totalItems} tours total
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="bg-muted/50 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-muted-foreground text-2xl">🗺️</span>
            </div>
            <h3 className="font-heading text-xl font-semibold">
              No tours available
            </h3>
            <p className="text-muted-foreground">
              Check back soon for new sustainable adventures in Scotland.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
