import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Portfolio",
  description:
    "Explore digital products and software projects built by DevEraa, from web platforms and mobile apps to business solutions.",
  pathname: "/portfolio",
});

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
