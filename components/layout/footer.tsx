import Link from "next/link";
import { MapPin, Mail, Leaf } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              <span className="font-heading text-lg font-bold">
                N'adair Tours
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              Sustainable tourism experiences across Scotland, supporting local
              communities and preserving natural heritage.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/tours"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                All Tours
              </Link>
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Cart
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary h-5 w-5" />
              <h3 className="font-heading text-sm font-semibold">
                Sustainability
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Committed to UN Sustainable Development Goals: Sustainable Cities
              (11), Responsible Consumption (12), and Life on Land (15).
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            © {currentYear} N'adair Tours. All rights reserved.
          </p>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:info@nadair-tours.com"
              className="hover:text-foreground transition-colors"
            >
              info@nadair-tours.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
