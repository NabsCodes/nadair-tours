import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TourImage } from "@/components/ui/tour-image";
import { FaMapMarkerAlt, FaClock, FaPoundSign, FaLeaf } from "react-icons/fa";
import type { TourCard } from "@/lib/types/tour";

type TourCardProps = {
  tour: TourCard;
};

export function TourCard({ tour }: TourCardProps) {
  const firstImage = tour.images[0] || "";

  return (
    <Link href={`/tours/${tour.id}`} className="group block h-full">
      <Card className="bg-card border-border hover:border-primary/50 h-full overflow-hidden border p-0 transition-all duration-300">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-lg">
          <TourImage
            src={firstImage}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
            {tour.sdgGoals.slice(0, 2).map((goal, index) => {
              const isPrimary = index % 2 === 0;
              return (
                <Badge
                  key={goal}
                  className={`text-[10px] font-semibold backdrop-blur-md ${
                    isPrimary
                      ? "bg-primary/90 text-primary-foreground"
                      : "bg-secondary/90 text-secondary-foreground"
                  }`}
                >
                  SDG {goal}
                </Badge>
              );
            })}
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-background/95 text-foreground px-3 py-1.5 text-sm font-bold backdrop-blur-md">
              <FaPoundSign className="mr-1 h-3.5 w-3.5" />
              {parseFloat(tour.price).toFixed(0)}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="bg-secondary/10 text-secondary flex h-5 w-5 items-center justify-center rounded">
              <FaLeaf className="h-3 w-3" />
            </div>
            <span className="text-secondary text-xs font-semibold tracking-wider uppercase">
              Sustainable Choice
            </span>
          </div>
          <CardTitle className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-bold transition-colors">
            {tour.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pb-6">
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {tour.description}
          </p>

          <div className="border-border flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
                <FaMapMarkerAlt className="h-3.5 w-3.5" />
              </div>
              <span className="text-muted-foreground max-w-[120px] truncate text-xs font-medium">
                {tour.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary/10 text-secondary flex h-7 w-7 items-center justify-center rounded-lg">
                <FaClock className="h-3.5 w-3.5" />
              </div>
              <span className="text-muted-foreground text-xs font-medium">
                {tour.duration}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
