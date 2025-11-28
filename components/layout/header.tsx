"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaMapMarkerAlt, FaShoppingBag, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/mobile-menu";

const CartBadge = dynamic(
  () =>
    import("@/components/cart/cart-badge").then((mod) => ({
      default: mod.CartBadge,
    })),
  { ssr: false },
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/95 border-border border-b backdrop-blur-xl"
            : "bg-background/60 backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center">
                <div className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-lg">
                  <FaMapMarkerAlt className="h-5 w-5" />
                </div>
                <div className="bg-secondary/30 border-background absolute -top-1 -right-1 h-3 w-3 rounded-full border-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl leading-tight font-bold tracking-tight">
                  N&apos;adair Tours
                </span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-[0.15em] uppercase">
                  Scotland
                </span>
              </div>
            </Link>

            {/* Centered Navigation */}
            <nav className="bg-muted/50 absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-sm md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-6 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="group border-primary/50 hover:bg-primary/10 hover:text-primary relative h-11 rounded-full border px-4 transition-all"
                  aria-label="Shopping cart"
                >
                  <FaShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="hidden font-medium sm:inline">Cart</span>
                  <CartBadge />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-full md:hidden"
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FaBars className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
