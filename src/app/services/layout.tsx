import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Development Services",
  description:
    "Discover DevEraa services for web development, mobile apps, SaaS platforms, AI, product design, and cloud engineering.",
  pathname: "/services",
});

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
