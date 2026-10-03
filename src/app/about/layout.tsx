import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Meet the team behind DevEraa and learn how we build thoughtful, reliable digital products for growing businesses.",
  pathname: "/about",
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
