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
import {
  FaMapMarkerAlt,
  FaClock,
  FaPoundSign,
  FaUsers,
  FaLeaf,
} from "react-icons/fa";
import { AddToCartButton } from "@/components/tours/add-to-cart-button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground flex items-center gap-2 text-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/tours">Tours</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tour.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tour.images.map((image, index) => (
          <div
            key={index}
            className={`group relative h-64 overflow-hidden rounded-xl ${
              index === 0
                ? "md:col-span-2 md:row-span-2 md:h-[600px]"
                : "md:h-64"
            }`}
          >
            <TourImage
              src={image}
              alt={`${tour.title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            {index === 0 && (
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {tour.sdgGoals.map((goal, index) => {
                const isPrimary = index % 2 === 0;
                return (
                  <Badge
                    key={goal}
                    variant={isPrimary ? "default" : "secondary"}
                    className={`text-xs font-medium ${
                      isPrimary
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-secondary/10 text-secondary border-secondary/20"
                    }`}
                  >
                    SDG {goal}: {sdgLabels[goal]}
                  </Badge>
                );
              })}
            </div>
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {tour.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
                {tour.description}
              </p>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="border-border bg-card hover:border-primary/50 hover:bg-primary/5 rounded-lg border p-4 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs font-medium">
                    Location
                  </div>
                  <div className="text-foreground text-sm font-semibold">
                    {tour.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-border bg-card hover:border-secondary/50 hover:bg-secondary/5 rounded-lg border p-4 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-secondary/10 text-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                  <FaClock className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs font-medium">
                    Duration
                  </div>
                  <div className="text-foreground text-sm font-semibold">
                    {tour.duration}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-border bg-card hover:border-primary/50 hover:bg-primary/5 rounded-lg border p-4 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs font-medium">
                    Capacity
                  </div>
                  <div className="text-foreground text-sm font-semibold">
                    {tour.maxCapacity} max
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border-border hover:border-secondary/50 hover:bg-secondary/5 rounded-lg border p-4 transition-all">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-secondary/10 text-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                  <FaLeaf className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs font-medium">
                    Sustainable
                  </div>
                  <div className="text-foreground text-sm font-semibold">
                    Eco-Certified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                <span className="text-lg font-bold">📋</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                Itinerary
              </h2>
            </div>
            <div className="space-y-3">
              <Accordion type="single" collapsible className="w-full">
                {tour.itinerary.map((item, index) => {
                  const isPrimary = index % 2 === 0;
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-card border-border hover:border-primary/50 data-[state=open]:border-primary/50 data-[state=open]:bg-primary/5 rounded-lg border px-4 transition-all"
                    >
                      <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                              isPrimary
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/10 text-secondary"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-foreground text-base">
                            {item}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="border-border ml-12 border-l-2 pl-4">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            Detailed information about this part of the tour
                            will be provided upon booking.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Sidebar - Booking Card */}
        <div className="lg:col-span-1">
          <Card className="border-border sticky top-24">
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-muted-foreground text-sm font-medium">
                    Price per person
                  </div>
                  <div className="text-primary flex items-baseline gap-1.5 text-3xl font-bold">
                    <FaPoundSign className="h-6 w-6" />
                    <span>{parseFloat(tour.price).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-border space-y-4 border-t pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <FaClock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium">
                        Duration
                      </div>
                      <div className="text-foreground text-sm font-semibold">
                        {tour.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary/10 text-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <FaMapMarkerAlt className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium">
                        Location
                      </div>
                      <div className="text-foreground text-sm font-semibold">
                        {tour.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <FaUsers className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium">
                        Group Size
                      </div>
                      <div className="text-foreground text-sm font-semibold">
                        Max {tour.maxCapacity} participants
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-border border-t pt-6">
                <AddToCartButton tour={tour} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
