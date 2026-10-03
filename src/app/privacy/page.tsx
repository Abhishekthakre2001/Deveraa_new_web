// app/privacy/page.tsx
import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Deveraa",
  description:
    "How Deveraa, a software company in Nagpur, India, collects, uses and protects personal data under the DPDP Act, 2023 and the IT Act, 2000.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}