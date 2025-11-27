import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import { getFeaturedTours } from "@/lib/db/queries";
import { Leaf, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Discover Scotland Sustainably | N'adair Tours",
  description:
    "Eco-conscious travel experiences across Scotland, supporting local communities and preserving natural heritage. Book your sustainable tour today.",
  openGraph: {
    title: "Discover Scotland Sustainably | N'adair Tours",
    description:
      "Eco-conscious travel experiences across Scotland, supporting local communities and preserving natural heritage.",
    type: "website",
  },
};

export default async function HomePage() {
  const featuredTours = await getFeaturedTours(6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="from-primary/20 via-background to-secondary/10 absolute inset-0 bg-linear-to-br" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552913902-b2cdb7c04e2b')] bg-cover bg-center opacity-20" />
        </div>

        <div className="animate-fade-in relative z-10 container mx-auto space-y-6 px-4 text-center">
          <h1 className="font-heading text-foreground text-5xl font-bold md:text-6xl lg:text-7xl">
            Discover Scotland
            <br />
            <span className="text-primary">Sustainably</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Eco-conscious travel experiences that support local communities and
            preserve Scotland's natural heritage
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="px-8 text-base">
              <Link href="/tours">Explore Tours</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 text-base"
            >
              <Link href="#sustainability">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="container mx-auto space-y-12 px-4 py-16">
        <div className="animate-slide-up space-y-4 text-center">
          <h2 className="font-heading text-4xl font-bold md:text-5xl">
            Featured Tours
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Handpicked sustainable experiences across Scotland's most beautiful
            landscapes
          </p>
        </div>

        {featuredTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour, index) => (
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
          <Button asChild variant="outline" size="lg">
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="bg-muted/30 border-y py-16">
        <div className="container mx-auto space-y-12 px-4">
          <div className="space-y-4 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Leaf className="text-primary h-8 w-8" />
              <h2 className="font-heading text-4xl font-bold md:text-5xl">
                Our Commitment
              </h2>
            </div>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              N'adair Tours is dedicated to sustainable tourism that aligns with
              the UN Sustainable Development Goals, ensuring our adventures
              benefit both travelers and the communities we visit.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-card space-y-4 rounded-lg border p-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="text-primary h-6 w-6" />
                <h3 className="font-heading text-xl font-semibold">SDG 11</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Sustainable Cities and Communities - Supporting local economies
                and preserving cultural heritage
              </p>
            </div>

            <div className="bg-card space-y-4 rounded-lg border p-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="text-primary h-6 w-6" />
                <h3 className="font-heading text-xl font-semibold">SDG 12</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Responsible Consumption - Eco-friendly practices and waste
                reduction
              </p>
            </div>

            <div className="bg-card space-y-4 rounded-lg border p-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Leaf className="text-primary h-6 w-6" />
                <h3 className="font-heading text-xl font-semibold">SDG 15</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Life on Land - Protecting biodiversity and natural habitats
                through responsible tourism
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
