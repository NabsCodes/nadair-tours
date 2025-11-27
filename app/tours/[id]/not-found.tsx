import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function TourNotFound() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <MapPin className="text-muted-foreground h-8 w-8" />
          </div>
          <CardTitle className="font-heading text-2xl">
            Tour Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The tour you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
