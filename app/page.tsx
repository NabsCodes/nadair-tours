import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedToursSectionWrapper } from "@/components/home/featured-tours-section-wrapper";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { SustainabilitySection } from "@/components/home/sustainability-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Discover Scotland Sustainably | N'adair Tours",
  description:
    "Eco-conscious travel experiences across Scotland, supporting local communities and preserving natural heritage. Book your sustainable tour today.",
  openGraph: {
    title: "Discover Scotland Sustainably | N'adair Tours",
    description:
      "Eco-conscious travel experiences across Scotland, supporting local communities and preserving natural heritage.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturedToursSectionWrapper />
      <WhyChooseSection />
      <SustainabilitySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
