import type { Metadata } from "next";
import { getAuthSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { getAdminStats } from "@/lib/db/queries-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, ShoppingBag, Clock, PoundSterling } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Dashboard | N'adair Tours",
  description: "Admin dashboard for managing tours and orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getAdminStats();

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTours}</div>
            <p className="text-muted-foreground text-xs">
              Active tour packages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-muted-foreground text-xs">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-muted-foreground text-xs">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <PoundSterling className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              £{stats.revenue.toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              From confirmed orders
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full" variant="outline">
              <Link href="/admin/tours/new">Create New Tour</Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/admin/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
