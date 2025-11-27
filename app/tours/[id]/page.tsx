import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTourById } from "@/lib/db/queries";
import { Badge } from "@/components/ui/badge";
import { TourImage } from "@/components/ui/tour-image";
import { sdgLabels } from "@/lib/types/tour";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Clock, PoundSterling, Users } from "lucide-react";
import { AddToCartButton } from "@/components/tours/add-to-cart-button";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    title: `${tour.title} | N'adair Tours`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} | N'adair Tours`,
      description: tour.description,
      images: tour.images[0] ? [{ url: tour.images[0] }] : [],
      type: "article",
    },
  };
}

export default async function TourDetailsPage({ params }: Props) {
  const { id } = await params;
  const tour = await getTourById(Number(id));

  if (!tour) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-16">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tour.images.map((image, index) => (
          <div
            key={index}
            className={`relative h-64 overflow-hidden rounded-lg ${
              index === 0 ? "md:col-span-2 md:row-span-2 md:h-full" : ""
            }`}
          >
            <TourImage
              src={image}
              alt={`${tour.title} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {tour.sdgGoals.map((goal) => (
                <Badge key={goal} variant="secondary" className="text-sm">
                  SDG {goal}: {sdgLabels[goal]}
                </Badge>
              ))}
            </div>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              {tour.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {tour.description}
            </p>
          </div>

          {/* Itinerary */}
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">Itinerary</h2>
            <Accordion type="single" collapsible className="w-full">
              {tour.itinerary.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      Detailed information about this part of the tour will be
                      provided upon booking.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Sidebar - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-card sticky top-24 space-y-6 rounded-lg border p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <div className="text-primary flex items-center gap-1 text-2xl font-bold">
                  <PoundSterling className="h-6 w-6" />
                  <span>{parseFloat(tour.price).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.maxCapacity} participants</span>
                </div>
              </div>
            </div>

            <AddToCartButton tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
}
