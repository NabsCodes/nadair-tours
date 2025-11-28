"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - subtle */}
        <div className="from-primary/10 via-background/90 to-secondary/5 absolute inset-0 bg-linear-to-br" />

        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552913902-b2cdb7c04e2b?w=1920&q=80')] bg-cover bg-center bg-no-repeat"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            transition: "transform 0.1s ease-out",
          }}
        />

        {/* Overlay gradient */}
        <div className="from-background/60 via-background/40 to-background/70 absolute inset-0 bg-linear-to-b" />

        {/* Animated gradient orbs - subtle */}
        <div className="bg-primary/10 absolute -top-1/4 -left-1/4 h-[600px] w-[600px] animate-pulse rounded-full blur-3xl" />
        <div
          className="bg-secondary/15 absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Badge */}
          <div className="animate-fade-in border-primary/30 inline-flex items-center gap-2 border-b pb-1">
            <span className="bg-primary h-1.5 w-1.5 rounded-full" />
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              Sustainable Tourism in Scotland
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-slide-up font-heading text-foreground text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            Discover Scotland
            <br />
            <span className="from-primary via-primary/80 to-primary bg-linear-to-r bg-clip-text text-transparent">
              Sustainably
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-slide-up text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ animationDelay: "100ms" }}
          >
            Eco-conscious travel experiences that support local communities and
            preserve Scotland's natural heritage for generations to come.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              asChild
              size="lg"
              className="group h-14 gap-2 rounded-full px-8 text-base font-semibold"
            >
              <Link href="/tours">
                Explore Tours
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
                <FaPlay className="h-4 w-4" />
                Learn More
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="animate-slide-up text-muted-foreground flex flex-wrap items-center justify-center gap-6 pt-8 text-sm"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-primary text-xs font-bold">✓</span>
              </div>
              <span>Eco-Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary/20 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-secondary text-xs font-bold">✓</span>
              </div>
              <span>Local Communities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                <span className="text-primary text-xs font-bold">✓</span>
              </div>
              <span>UN SDG Aligned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="from-primary/0 via-primary/50 to-primary/0 h-16 w-px bg-linear-to-b" />
      </div>
    </section>
  );
}
