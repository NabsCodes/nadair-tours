import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import type { Tour } from "@/lib/types/tour";

interface FeaturedToursSectionProps {
  tours: Tour[];
}

export function FeaturedToursSection({ tours }: FeaturedToursSectionProps) {
  return (
    <section className="container mx-auto space-y-12 px-4 py-20">
      <div className="animate-slide-up space-y-4 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="bg-secondary h-px w-12" />
          <span className="text-secondary text-sm font-semibold tracking-wider uppercase">
            Featured
          </span>
          <span className="bg-secondary h-px w-12" />
        </div>
        <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Handpicked Experiences
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Discover Scotland's most beautiful landscapes through sustainable,
          community-supported tours
        </p>
      </div>

      {tours.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tours available yet.</p>
        </div>
      )}

      <div className="pt-8 text-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group rounded-full px-8 transition-all hover:scale-105"
        >
          <Link href="/tours">
            View All Tours
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
