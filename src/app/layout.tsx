import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CookieConsent } from "@/components/cookie-consent";
import { Providers } from "@/components/providers";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Premium Software Development`,
  description: "Build modern software products faster with DevEraa. We specialize in enterprise-grade web, mobile, SaaS, and AI solutions.",
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    title: `${SITE_NAME} | Premium Software Development`,
    description: "Build modern software products faster with DevEraa.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} — Premium Software Development` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Software Development`,
    description: "Build modern software products faster with DevEraa.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  email: "info@deveraa.com",
                  telephone: "+91 92701 39519",
                  sameAs: [
                    "https://www.linkedin.com/company/deveraa/posts/?feedView=all",
                    "https://www.youtube.com/@DeveraaOfficial",
                    "https://www.instagram.com/deveraaofficial/",
                    "https://www.facebook.com/people/DevEraa/61570090200272/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  inLanguage: "en",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
