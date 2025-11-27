"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, MapPin } from "lucide-react";
import { useState } from "react";

const CartBadge = dynamic(
  () =>
    import("@/components/cart/cart-badge").then((mod) => ({
      default: mod.CartBadge,
    })),
  { ssr: false },
);

const MobileCartBadge = dynamic(
  () =>
    import("@/components/cart/mobile-cart-badge").then((mod) => ({
      default: mod.MobileCartBadge,
    })),
  { ssr: false },
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
  ];

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative">
            <MapPin className="text-primary h-6 w-6 transition-transform group-hover:scale-110" />
            <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
          </div>
          <span className="font-heading text-foreground text-xl font-bold">
            N'adair Tours
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground group relative text-sm font-medium transition-colors"
            >
              {link.label}
              <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <CartBadge />
            </Button>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary text-lg font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
                >
                  Cart
                  <MobileCartBadge />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
