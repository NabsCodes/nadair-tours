import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-helpers";
import { getToursPaginatedAdmin } from "@/lib/db/queries-admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteTourButton } from "@/components/admin/delete-tour-button";

export const metadata: Metadata = {
  title: "Manage Tours | N'adair Tours",
  description: "Create, edit, and delete tour packages",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = {
  page?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function AdminToursPage({ searchParams }: Props) {
  await requireAuth();
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { tours, pagination } = await getToursPaginatedAdmin(currentPage, 10);

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold">Manage Tours</h1>
          <p className="text-muted-foreground">
            Create, edit, and delete tour packages
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <Plus className="mr-2 h-4 w-4" />
            New Tour
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <p className="text-muted-foreground">No tours found</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/admin/tours/new">Create First Tour</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-mono text-sm">{tour.id}</TableCell>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>£{parseFloat(tour.price).toFixed(2)}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/tours/${tour.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteTourButton
                        tourId={tour.id}
                        tourTitle={tour.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            disabled={!pagination.hasPrev}
            className={!pagination.hasPrev ? "opacity-50" : ""}
          >
            <Link
              href={`/admin/tours?page=${pagination.currentPage - 1}`}
              className={!pagination.hasPrev ? "pointer-events-none" : ""}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>

          <Button
            asChild
            variant="outline"
            disabled={!pagination.hasNext}
            className={!pagination.hasNext ? "opacity-50" : ""}
          >
            <Link
              href={`/admin/tours?page=${pagination.currentPage + 1}`}
              className={!pagination.hasNext ? "pointer-events-none" : ""}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
