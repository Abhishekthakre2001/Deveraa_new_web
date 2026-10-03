import { HeroSection } from "@/components/home/hero-section";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { ServicesSection } from "@/components/home/services-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { ProcessSection } from "@/components/home/process-section";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { PortfolioPreviewSection } from "@/components/home/portfolio-preview-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";
import { CtaSection } from "@/components/home/cta-section";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Build Modern Software Products Faster",
  description:
    "DevEraa builds enterprise-grade web, mobile, SaaS, and AI products for forward-thinking businesses.",
  pathname: "/",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShowcaseSection />
      <TrustedBySection />
      <ServicesSection />
      <IndustriesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioPreviewSection />
      <TestimonialsSection />
      {/* <TeamSection /> */}
      <ContactSection />
      <CtaSection />
    </>
  );
}
