"use client";

// components/legal/privacy-policy.tsx

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useScroll } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Home,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

// Placeholders: replace with your real company details
const COMPANY = "Deveraa";
const LAST_UPDATED = "3 October 2026";
const EMAIL = "info@deveraa.com";
const PHONE = "+91 92701 39519";
const ADDRESS = "Nagpur, Maharashtra 440009, India";

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[]; // "Label: text" renders the label in bold
  after?: string[];
  kv?: [string, string][];
};

const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      `${COMPANY} ("we", "us", "our") is a software development company based in Nagpur, Maharashtra, India. This Privacy Policy explains how we collect, use, share and protect your personal data when you visit our website, contact us or use our services.`,
      "We handle personal data in line with the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000 and the rules made under it, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. By using our website you acknowledge this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    items: [
      "Details you give us: your name, email address, phone number, company name and the project details you share through our contact form, meeting bookings or email.",
      "Usage data: IP address, browser and device type, pages viewed, referring pages, time spent and approximate location derived from your IP address.",
      "Cookies and similar technologies: small files that help the site work, remember preferences and measure performance.",
      "Client project data: information you or your users share while we build or support a product. We process it only to deliver the agreed services and under our contract with you.",
    ],
    after: [
      "We do not intentionally collect sensitive information such as passwords, payment card details, health or biometric data through our website. Please do not send us such information through forms or email.",
    ],
  },
  {
    id: "how-we-use-data",
    title: "How we use your data",
    items: [
      "Respond to enquiries, prepare proposals and schedule meetings",
      "Provide, manage and bill for our software development services",
      "Operate, secure and improve our website and services",
      "Send updates, articles or offers, only where you have agreed, with an easy way to opt out",
      "Prevent fraud and misuse, and comply with legal obligations",
    ],
  },
  {
    id: "consent",
    title: "Consent and lawful use",
    paragraphs: [
      "Under the DPDP Act we process your personal data when you have given consent, or for certain legitimate uses the law allows, such as performing a contract with you, responding to a request you made, or meeting a legal obligation.",
      "Where we rely on consent, you can withdraw it at any time by writing to us. Withdrawal does not affect processing done before it, and we will stop the related processing unless the law requires us to continue.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    paragraphs: [
      "We use cookies to make the site work and to understand how it is used. When you first visit, our cookie banner lets you accept or decline non-essential cookies.",
    ],
    items: [
      "Essential cookies: needed for security and core features. These cannot be switched off.",
      "Analytics cookies: help us understand which pages are useful and how to improve them.",
      "Preference cookies: remember choices such as your light or dark theme.",
    ],
    after: [
      "You can also block or delete cookies in your browser settings, though some features may stop working.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and disclosure",
    paragraphs: ["We do not sell your personal data. We share it only in these situations:"],
    items: [
      "Service providers: trusted vendors that help us run our business, such as hosting, cloud, email, analytics, scheduling and project-management tools. They may process data only on our instructions and under confidentiality obligations.",
      "Professional advisers: lawyers, accountants and auditors, where necessary.",
      "Legal and regulatory requests: courts, law enforcement or government authorities, when required by Indian law.",
      "Business changes: a merger, acquisition or restructuring, in which case we will make sure your data stays protected.",
    ],
  },
  {
    id: "transfers",
    title: "Storage and transfers outside India",
    paragraphs: [
      "Your data may be stored on servers in India or in other countries, depending on the providers we use. Where data is transferred outside India, we do so in line with the DPDP Act, which permits transfers except to countries the Central Government may restrict, and we use contractual and technical safeguards to protect it.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep data",
    paragraphs: [
      "We keep personal data only for as long as needed for the purposes in this policy or as required by law, for example for accounting, tax and company-law record keeping. When it is no longer needed, we delete or anonymise it. Enquiries that do not lead to a project are deleted after a reasonable period.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We apply reasonable security safeguards, including encrypted connections (HTTPS), access controls, regular software updates and confidentiality obligations for our team. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      "If a personal data breach occurs, we will notify the Data Protection Board of India and the affected individuals as required by law.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: ["Under the DPDP Act you have the right to:"],
    items: [
      "Access: get a summary of the personal data we process about you and who we have shared it with.",
      "Correction and updating: ask us to correct inaccurate data or complete and update it.",
      "Erasure: ask us to delete your data when it is no longer needed or you have withdrawn consent, unless the law requires us to keep it.",
      "Grievance redressal: have any concern about your data handled promptly (see section 13).",
      "Nomination: nominate another person to exercise your rights if you die or become unable to do so.",
    ],
    after: [
      `To exercise a right, email us at ${EMAIL} with the subject "Data request". We may need to verify your identity first, and we will respond within the time limits prescribed by law.`,
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    paragraphs: [
      "Our website and services are intended for businesses and adults. Under the DPDP Act, a child is a person under 18. We do not knowingly collect personal data of children without the verifiable consent of a parent or guardian. If you believe a child has given us data, contact us and we will delete it.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    paragraphs: [
      "Our website may link to other sites, such as our social media pages. They have their own privacy practices and we are not responsible for them. Please read their policies before sharing your data.",
    ],
  },
  {
    id: "grievance-officer",
    title: "Grievance Officer",
    paragraphs: [
      "In line with the Information Technology Act, 2000 and the DPDP Act, you can contact our Grievance Officer with any concern about how your personal data is handled.",
    ],
    kv: [
     
      ["Company", COMPANY],
      ["Address", ADDRESS],
      ["Email", EMAIL],
      ["Phone", PHONE],
    ],
    after: [
      "We will acknowledge your complaint within 48 hours and aim to resolve it within one month of receiving it. You may also complain to the Data Protection Board of India as provided under the DPDP Act.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The latest version will always be on this page with the date it was last updated. For significant changes we will notify you through the website or by email.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      "This policy is governed by the laws of India. Subject to applicable law, the courts at Nagpur, Maharashtra have exclusive jurisdiction over any dispute arising from it.",
    ],
  },
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: "We don't sell your data", text: "Your personal information is never sold to third parties." },
  { icon: UserCheck, title: "You stay in control", text: "Access, correct or delete your data whenever you ask." },
  { icon: Lock, title: "Protected by design", text: "Safeguards aligned with Indian data protection law." },
];

/* ---------- pieces ---------- */

function Breadcrumb() {
  return (
    <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <ol className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm backdrop-blur">
        <li>
          <Link href="/" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
          Privacy Policy
        </li>
      </ol>
    </motion.nav>
  );
}

function Rich({ text }: { text: string }) {
  // "Label: rest" renders the label in bold
  const i = text.indexOf(": ");
  if (i > 0 && i < 40) {
    return (
      <span>
        <strong className="font-semibold text-foreground">{text.slice(0, i)}:</strong> {text.slice(i + 2)}
      </span>
    );
  }
  return <span>{text}</span>;
}

function Toc({ active, progressRef }: { active: string; progressRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target: progressRef, offset: ["start 0.3", "end 0.7"] });
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-sm font-semibold">On this page</p>
      <ol className="relative max-h-[calc(100vh-12rem)] space-y-0.5 overflow-y-auto border-l">
        <motion.span
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className={`pointer-events-none absolute -left-px top-0 h-full w-0.5 origin-top bg-gradient-to-b ${GRADIENT}`}
        />
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block py-1.5 pl-4 text-sm transition-colors",
                active === s.id
                  ? "font-semibold text-blue-600 dark:text-cyan-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="mr-2 text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- page ---------- */

export function PrivacyPolicy() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(SECTIONS[0].id);

  // Highlight the section currently being read
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 text-foreground opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="container relative mx-auto px-4 pb-16 pt-28 sm:px-8 sm:pt-32">
            <Breadcrumb />

            <div className="mx-auto mt-12 max-w-3xl text-center">
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="inline-block overflow-hidden pb-2 align-top">
                  <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                    Privacy
                  </motion.span>
                </span>{" "}
                <span className="inline-block overflow-hidden pb-2 align-top">
                  <motion.span
                    className={`inline-block bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
                  >
                    Policy
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
              >
                How {COMPANY} collects, uses and protects your personal data.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-3 text-sm"
              >
                {[
                  { icon: CalendarDays, label: `Last updated: ${LAST_UPDATED}` },
                  { icon: MapPin, label: "Nagpur, Maharashtra, India" },
                  { icon: ShieldCheck, label: "DPDP Act, 2023" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 backdrop-blur">
                    <Icon className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="container mx-auto px-4 pb-16 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 rounded-3xl border bg-card p-6 transition-colors hover:border-blue-500/40"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold">{h.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Table of contents + policy */}
        <section className="container mx-auto px-4 pb-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
            <aside>
              {/* Mobile: collapsible list */}
              <details className="group rounded-2xl border bg-card lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold">
                  On this page
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="space-y-2 px-4 pb-4">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                        <span className="mr-2 text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              {/* Desktop: sticky with scroll spy */}
              <div className="sticky top-28 hidden lg:block">
                <Toc active={active} progressRef={contentRef} />
              </div>
            </aside>

            <div ref={contentRef} className="space-y-6">
              {SECTIONS.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="scroll-mt-28 rounded-3xl border bg-card p-6 sm:p-8"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${GRADIENT} text-sm font-bold text-white`}>
                      {i + 1}
                    </span>
                    <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
                  </div>

                  <div className="space-y-4 leading-relaxed text-muted-foreground">
                    {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}

                    {s.items && (
                      <ul className="space-y-3">
                        {s.items.map((it) => (
                          <li key={it} className="flex gap-3">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400">
                              <Check className="h-3 w-3" />
                            </span>
                            <Rich text={it} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.kv && (
                      <dl className="space-y-3 rounded-2xl border bg-muted/30 p-5">
                        {s.kv.map(([k, v]) => (
                          <div key={k} className="grid gap-1 sm:grid-cols-[8rem_1fr]">
                            <dt className="text-sm font-semibold text-foreground">{k}</dt>
                            <dd className="break-words">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {s.after?.map((p) => <p key={p}>{p}</p>)}
                  </div>
                </motion.section>
              ))}

              {/* Contact card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${GRADIENT} p-8 text-white sm:p-10`}
              >
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
                <h2 className="relative text-2xl font-bold sm:text-3xl">Have a question about your data?</h2>
                <p className="relative mt-2 max-w-lg text-white/85">
                  Write to us and we&apos;ll respond promptly.
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
                >
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}