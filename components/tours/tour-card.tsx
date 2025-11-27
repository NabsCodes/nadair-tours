import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TourImage } from "@/components/ui/tour-image";
import { MapPin, Clock, PoundSterling } from "lucide-react";
import type { TourCard } from "@/lib/types/tour";
import { sdgLabels } from "@/lib/types/tour";

type TourCardProps = {
  tour: TourCard;
};

export function TourCard({ tour }: TourCardProps) {
  const firstImage = tour.images[0] || "";

  return (
    <Link href={`/tours/${tour.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <TourImage
            src={firstImage}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 flex flex-wrap gap-1">
            {tour.sdgGoals.map((goal) => (
              <Badge
                key={goal}
                variant="secondary"
                className="bg-background/90 text-xs backdrop-blur-sm"
              >
                SDG {goal}
              </Badge>
            ))}
          </div>
        </div>

        <CardHeader className="flex-1">
          <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
            {tour.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {tour.description}
          </p>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex w-full items-center justify-between">
            <div className="text-primary flex items-center gap-1 text-lg font-bold">
              <PoundSterling className="h-5 w-5" />
              <span>{parseFloat(tour.price).toFixed(2)}</span>
            </div>
            <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors">
              View Details →
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
