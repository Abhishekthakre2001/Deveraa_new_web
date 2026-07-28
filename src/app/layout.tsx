import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CookieConsent } from "@/components/cookie-consent";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Deveraa | Premium Software Development",
    template: "%s | Deveraa",
  },
  description: "Build modern software products faster with Deveraa. We specialize in enterprise-grade web, mobile, SaaS, and AI solutions.",
  metadataBase: new URL("https://deveraa.com"),
  openGraph: {
    title: "Deveraa | Premium Software Development",
    description: "Build modern software products faster with Deveraa.",
    url: "https://deveraa.com",
    siteName: "Deveraa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deveraa | Premium Software Development",
    description: "Build modern software products faster with Deveraa.",
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
