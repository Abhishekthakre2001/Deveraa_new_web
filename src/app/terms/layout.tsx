import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Review the terms that apply when you access and use the DevEraa website.",
  pathname: "/terms",
});

export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
