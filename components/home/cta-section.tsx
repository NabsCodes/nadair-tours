import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background with gradient mix */}
      <div className="absolute inset-0">
        <div className="from-primary/10 via-secondary/5 to-primary/10 absolute inset-0 bg-linear-to-br" />
        <div className="bg-primary/5 absolute -top-1/4 -left-1/4 h-[600px] w-[600px] animate-pulse rounded-full blur-3xl" />
        <div
          className="bg-secondary/10 absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Ready to Explore
              <br />
              <span className="from-primary via-secondary to-primary bg-linear-to-r bg-clip-text text-transparent">
                Scotland?
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
              Join thousands of travelers discovering Scotland's natural beauty
              through sustainable, community-supported tours. Your adventure
              awaits!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-14 gap-2 rounded-full px-8 text-base font-semibold"
            >
              <Link href="/tours">
                Browse All Tours
                <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group h-14 gap-2 rounded-full border-2 px-8 text-base font-semibold"
            >
              <Link href="#sustainability">
                Learn About Sustainability
                <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
