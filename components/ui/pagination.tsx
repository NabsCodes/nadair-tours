"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/tours",
}: PaginationProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const getPageUrl = (page: number) => {
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        className={cn(
          "border-border h-9 min-w-9 rounded-lg px-3 transition-all",
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:border-primary hover:bg-primary/5 hover:text-primary",
        )}
      >
        {currentPage === 1 ? (
          <span>
            <FaChevronLeft className="h-3.5 w-3.5" />
          </span>
        ) : (
          <Link href={getPageUrl(currentPage - 1)}>
            <FaChevronLeft className="h-3.5 w-3.5" />
          </Link>
        )}
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="text-muted-foreground flex h-9 w-9 items-center justify-center text-sm"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              asChild
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                "border-border h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:border-primary hover:bg-primary/5 hover:text-primary",
              )}
            >
              <Link href={getPageUrl(pageNum)}>{pageNum}</Link>
            </Button>
          );
        })}
      </div>

      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        className={cn(
          "border-border h-9 min-w-9 rounded-lg px-3 transition-all",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:border-primary hover:bg-primary/5 hover:text-primary",
        )}
      >
        {currentPage === totalPages ? (
          <span>
            <FaChevronRight className="h-3.5 w-3.5" />
          </span>
        ) : (
          <Link href={getPageUrl(currentPage + 1)}>
            <FaChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </Button>
    </nav>
  );
}
