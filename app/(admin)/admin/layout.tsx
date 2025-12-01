import type { Metadata } from "next";
import { headers } from "next/headers";
import { getAuthSession } from "@/lib/auth-helpers";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

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
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";

  // If it's the login page, render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Middleware handles auth redirect, we just need session for display
  const session = await getAuthSession();

  const user = {
    name: session?.user?.name || "Admin",
    email: session?.user?.email || "",
    image: session?.user?.image ?? null,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="font-semibold">Admin Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <Button size="icon" variant="outline" asChild>
              <Link href="/">
                <Home className="size-4" />
              </Link>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
