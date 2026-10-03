// app/terms/page.tsx
import type { Metadata } from "next";
import { TermsOfService } from "@/components/legal/terms-of-service";

export const metadata: Metadata = {
  title: "Terms of Service | Deveraa",
  description:
    "The terms that apply when you use the Deveraa website or work with our software development team in Nagpur, India.",
};

export default function TermsPage() {
  return <TermsOfService />;
}