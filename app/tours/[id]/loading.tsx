import { Skeleton } from "@/components/ui/skeleton";

export default function TourDetailsLoading() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-96 md:col-span-2 md:row-span-2 md:h-full" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
