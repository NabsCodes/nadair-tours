import type { Metadata } from "next";
import { getAuthSession } from "@/lib/auth-helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, LayoutDashboard, MapPin } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";

export const metadata: Metadata = {
  title: "Admin Dashboard | N'adair Tours",
  description: "Admin dashboard for managing tours and orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles auth redirect, we just need session for display
  const session = await getAuthSession();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Admin Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="group flex items-center gap-2">
            <div className="relative">
              <MapPin className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
            </div>
            <span className="font-heading text-foreground text-xl font-bold">
              N'adair Tours Admin
            </span>
          </Link>
          {session?.user?.name && (
            <div className="text-muted-foreground text-sm">
              {session.user.name}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <aside className="bg-muted/30 w-64 border-r p-6">
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="font-heading text-lg font-bold">Admin Panel</h2>
              {session?.user?.name && (
                <p className="text-muted-foreground text-sm">
                  {session.user.name}
                </p>
              )}
            </div>

            <nav className="space-y-2">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <span>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </span>
                </Button>
              </Link>
              <Link href="/admin/tours">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <span>
                    <Package className="mr-2 h-4 w-4" />
                    Tours
                  </span>
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <span>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </span>
                </Button>
              </Link>
            </nav>

            <SignOutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
