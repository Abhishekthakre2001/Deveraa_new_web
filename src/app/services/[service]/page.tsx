// app/services/[service]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services-data";
import { ServiceDetail } from "@/components/services/Service-detail";

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

  return {
    title: `${data.title} | Deveraa`,
    description: data.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params;
  const slug = resolveServiceSlug(service);

  if (!slug) notFound();

  return <ServiceDetail slug={slug} />;
}