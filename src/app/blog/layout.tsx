import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Insights on Software and Product Engineering",
  description:
    "Explore DevEraa insights on software development, digital products, web and mobile apps, SaaS, and artificial intelligence.",
  pathname: "/blog",
  noIndex: true,
});

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
