import type { Metadata } from "next";
import { createPageMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with DevEraa to discuss your web, mobile, SaaS, AI, design, or cloud software project.",
  pathname: "/contact",
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      {children}
    </>
  );
}
