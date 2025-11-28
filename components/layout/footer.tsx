import Link from "next/link";
import { FaMapMarkerAlt, FaLeaf } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 relative">
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl">
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-tight">
                  N'adair Tours
                </span>
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Sustainable Scotland
                </span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Authentic, sustainable tourism experiences across the rugged
              beauty of Scotland.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="font-heading text-sm font-semibold tracking-tight">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/tours">Our Tours</FooterLink>
              <FooterLink href="/#sustainability">Sustainability</FooterLink>
            </nav>
          </div>

          {/* Commitment */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <FaLeaf className="h-4 w-4" />
              </div>
              <h3 className="font-heading text-sm font-semibold tracking-tight">
                Our Commitment
              </h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Aligned with UN Sustainable Development Goals for responsible
              tourism.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <SDGCard number="11" title="Sustainable Cities" />
              <SDGCard number="12" title="Responsible Consumption" />
              <SDGCard number="15" title="Life on Land" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border mt-8 flex flex-col items-center justify-center gap-4 border-t pt-6 text-xs md:flex-row">
          <p className="text-muted-foreground">
            © {currentYear} N'adair Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
    >
      <span className="bg-primary h-px w-0 transition-all group-hover:w-3" />
      <span>{children}</span>
    </Link>
  );
}

function SDGCard({ number, title }: { number: string; title: string }) {
  return (
    <div className="bg-card border-border hover:border-primary/30 rounded-lg border p-2 text-center transition-all hover:shadow-sm">
      <div className="text-primary mb-1 text-[10px] font-bold">
        SDG {number}
      </div>
      <div className="text-muted-foreground text-[10px] leading-tight">
        {title}
      </div>
    </div>
  );
}
