import type { Metadata } from "next";

export const SITE_URL = "https://deveraa.com";
export const SITE_NAME = "DevEraa";

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function createPageMetadata({
  title,
  description,
  pathname,
  noIndex = false,
}: {
  title: string;
  description: string;
  pathname: string;
  noIndex?: boolean;
}): Metadata {
  const canonicalUrl = new URL(pathname, SITE_URL).toString();
  const socialTitle = `${title} | ${SITE_NAME}`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — ${title}`,
  };

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
