"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Logo from "../app/assets/deveraa-logo.png";
/**
 * Deveraa — Footer (light + dark)
 *
 * 1. Call-to-action band
 * 2. Brand, social icons and link columns
 * 3. Bottom bar with back-to-top
 * 4. Oversized wordmark that rises in as the footer scrolls into view
 *
 * >>> Replace the placeholder CONTACT and SOCIALS links below with your real ones. <<<
 * Brand icons: Font Awesome Free (CC BY 4.0), inlined so no extra package is needed.
 */

const CONTACT = {
  email: "hello@deveraa.com",
  phone: "+91 00000 00000",
  whatsappNumber: "910000000000", // country code + number, digits only
};

/* ───── Brand icons (Font Awesome Free) ───── */
const FACEBOOK_F = { viewBox: "0 0 320 512", path: "M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" };
const WHATSAPP = { viewBox: "0 0 448 512", path: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" };
const INSTAGRAM = { viewBox: "0 0 448 512", path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" };
const LINKEDIN_IN = { viewBox: "0 0 448 512", path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" };
const YOUTUBE = { viewBox: "0 0 576 512", path: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" };

type Brand = { viewBox: string; path: string };

function BrandIcon({ icon, className = "h-[18px] w-[18px]" }: { icon: Brand; className?: string }) {
  return (
    <svg viewBox={icon.viewBox} className={className} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  "Hi Deveraa, I'd like to talk about a project."
)}`;

const SOCIALS: { name: string; href: string; icon: Brand; color: string }[] = [
  { name: "Facebook", href: "https://facebook.com/deveraa", icon: FACEBOOK_F, color: "#1877F2" },
  { name: "WhatsApp", href: WHATSAPP_URL, icon: WHATSAPP, color: "#25D366" },
  { name: "Instagram", href: "https://instagram.com/deveraa", icon: INSTAGRAM, color: "#E4405F" },
  { name: "LinkedIn", href: "https://linkedin.com/company/deveraa", icon: LINKEDIN_IN, color: "#0A66C2" },
  { name: "YouTube", href: "https://youtube.com/@deveraa", icon: YOUTUBE, color: "#FF0000" },
];

const LINKS = [
  {
    title: "Services",
    items: [
      { label: "Web Development", href: "/services/web" },
      { label: "Mobile Apps", href: "/services/mobile" },
      { label: "SaaS Solutions", href: "/services/saas" },
      { label: "AI & ML", href: "/services/ai" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const linkClass =
  "text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm dark:text-slate-400 dark:hover:text-white";

export function Footer() {
  const reduce = !!useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-[#070b17] dark:text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-600/15" />

      <div className="container relative mx-auto px-4 pt-16 sm:px-8 md:pt-24">
        {/* 1. Call to action */}
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-14 md:flex-row md:items-end md:justify-between md:pb-16 dark:border-white/10">
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Have a product in mind? Let&apos;s build it.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-400 dark:text-[#0a1020] dark:hover:bg-blue-300 dark:focus-visible:ring-offset-[#070b17]"
            >
              Start a project
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 px-7 py-3.5 font-semibold transition-colors hover:border-[#25D366] hover:text-[#1da851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:hover:border-[#25D366] dark:hover:text-[#25D366]"
            >
              <BrandIcon icon={WHATSAPP} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* 2. Brand + links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:gap-x-8 md:py-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            {/* <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-serif text-xl text-white dark:bg-blue-400 dark:text-[#0a1020]">
                D
              </span>
              <span className="text-xl font-bold">Deveraa</span>
            </Link> */}
            <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Deveraa home">
              <Image
                src={Logo}
                alt="Deveraa Logo"
                width={160}
                height={45}
                priority
              // className={("w-auto transition-all duration-500", pill ? "h-8 sm:h-9" : "h-9 sm:h-10")}
              />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We build modern web, mobile, SaaS and AI products for businesses that need them to perform.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Deveraa on social media">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Deveraa on ${s.name}`}
                    title={s.name}
                    style={{ "--brand": s.color } as CSSProperties}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/15 dark:text-slate-300 dark:hover:text-white"
                  >
                    <BrandIcon icon={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {LINKS.map((group, i) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className={`lg:col-span-2 ${i === 0 ? "lg:col-start-6" : ""}`}
            >
              <h3 className="font-semibold">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {group.items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h3 className="font-semibold">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Mail size={16} className="shrink-0" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <Phone size={16} className="shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom bar */}
        <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-slate-200 py-7 text-sm text-slate-600 sm:flex-row sm:items-center dark:border-white/10 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Deveraa. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 py-2 pl-4 pr-3 transition-colors hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/15 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            Back to top
            <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* 4. Wordmark */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none -mb-[3vw] select-none text-center font-serif text-[24vw] font-bold leading-[0.85] tracking-tighter text-transparent bg-gradient-to-b from-slate-300 to-transparent bg-clip-text md:text-[19vw] dark:from-white/15"
      >
        Deveraa
      </motion.div>
    </footer>
  );
}