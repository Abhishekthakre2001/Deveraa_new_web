import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((pathname) => ({
      url: new URL(pathname, SITE_URL).toString(),
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: new URL(`/services/${slug}`, SITE_URL).toString(),
    })),
  ];
}
