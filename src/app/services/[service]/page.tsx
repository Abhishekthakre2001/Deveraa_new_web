// app/services/[service]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services-data";
import { ServiceDetail } from "@/components/services/Service-detail";
import { createPageMetadata, serializeJsonLd, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ service: string }> };

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  mobile: "mobile-apps",
  web: "web-development",
  saas: "saas-solutions",
  ai: "ai-ml",
  "ui-ux": "ui-ux-design",
  cloud: "cloud-devops",
};

function resolveServiceSlug(service: string) {
  return SERVICES[service] ? service : SERVICE_SLUG_ALIASES[service];
}

export function generateStaticParams() {
  return [...SERVICE_SLUGS, ...Object.keys(SERVICE_SLUG_ALIASES)].map((service) => ({
    service,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const slug = resolveServiceSlug(service);
  const data = slug ? SERVICES[slug] : undefined;
  if (!data) return { title: "Service not found" };

  return createPageMetadata({
    title: data.title,
    description: data.description,
    pathname: `/services/${data.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params;
  const slug = resolveServiceSlug(service);

  if (!slug) notFound();
  const data = SERVICES[slug];
  const canonicalUrl = `${SITE_URL}/services/${data.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: data.title,
        description: data.description,
        serviceType: data.title,
        url: canonicalUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: data.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ServiceDetail slug={slug} />
    </>
  );
}