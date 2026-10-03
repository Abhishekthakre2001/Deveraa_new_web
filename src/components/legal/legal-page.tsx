"use client";

// components/legal/legal-page.tsx
// Shared layout for legal pages (Terms, and Privacy if you want to reuse it).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useScroll } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Home,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[]; // "Label: text" renders the label in bold
  after?: string[];
  kv?: [string, string][];
  links?: { label: string; href: string }[];
};

type Props = {
  breadcrumb: string;
  titleStart: string;
  titleEnd: string;
  subtitle: string;
  chips: { icon: LucideIcon; label: string }[];
  highlights: { icon: LucideIcon; title: string; text: string }[];
  sections: LegalSection[];
  contact: { title: string; text: string; email: string };
};

function Rich({ text }: { text: string }) {
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

function Toc({
  sections,
  active,
  progressRef,
}: {
  sections: LegalSection[];
  active: string;
  progressRef: React.RefObject<HTMLDivElement | null>;
}) {
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
        {sections.map((s, i) => (
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

export function LegalPage({
  breadcrumb,
  titleStart,
  titleEnd,
  subtitle,
  chips,
  highlights,
  sections,
  contact,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

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
                  {breadcrumb}
                </li>
              </ol>
            </motion.nav>

            <div className="mx-auto mt-12 max-w-3xl text-center">
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="inline-block overflow-hidden pb-2 align-top">
                  <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                    {titleStart}
                  </motion.span>
                </span>{" "}
                <span className="inline-block overflow-hidden pb-2 align-top">
                  <motion.span
                    className={`inline-block bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
                  >
                    {titleEnd}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-3 text-sm"
              >
                {chips.map(({ icon: Icon, label }) => (
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
            {highlights.map((h, i) => {
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

        {/* Table of contents + content */}
        <section className="container mx-auto px-4 pb-24 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
            <aside>
              <details className="group rounded-2xl border bg-card lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold">
                  On this page
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="space-y-2 px-4 pb-4">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                        <span className="mr-2 text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <div className="sticky top-28 hidden lg:block">
                <Toc sections={sections} active={active} progressRef={contentRef} />
              </div>
            </aside>

            <div ref={contentRef} className="space-y-6">
              {sections.map((s, i) => (
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

                    {s.links && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        {s.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-muted dark:text-cyan-400"
                          >
                            {l.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    )}
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
                <h2 className="relative text-2xl font-bold sm:text-3xl">{contact.title}</h2>
                <p className="relative mt-2 max-w-lg text-white/85">{contact.text}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}