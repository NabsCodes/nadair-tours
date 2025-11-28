import { Suspense } from "react";
import { getFeaturedTours } from "@/lib/db/queries";
import { FeaturedToursSection } from "@/components/home/featured-tours-section";

async function FeaturedToursData() {
  const featuredTours = await getFeaturedTours(6);
  return <FeaturedToursSection tours={featuredTours} />;
}

export function FeaturedToursSectionWrapper() {
  return (
    <Suspense
      fallback={
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
        </section>
      }
    >
      <FeaturedToursData />
    </Suspense>
  );
}
