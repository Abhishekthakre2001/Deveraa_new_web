"use client";

// components/services/service-detail.tsx

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Home, Plus } from "lucide-react";
import { SERVICES, type Service, type Tech } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

const PROCESS = [
  { title: "Discover", text: "We dig into your goals, users and constraints to define what success looks like." },
  { title: "Design", text: "Wireframes and clickable prototypes before a single line of code is written." },
  { title: "Develop", text: "Agile sprints with weekly demos, so you always see real progress." },
  { title: "Deliver", text: "We launch, monitor and keep improving the product alongside you." },
];

/* ---------- small pieces ---------- */

function Breadcrumb({ title }: { title: string }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm backdrop-blur">
        <li>
          <Link href="/" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
        </li>
        <li>
          <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
            Services
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
          {title}
        </li>
      </ol>
    </motion.nav>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mb-14 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-5xl"
    >
      {children}
    </motion.h2>
  );
}

const Gradient = ({ children }: { children: React.ReactNode }) => (
  <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>{children}</span>
);

function TechLogo({ tech }: { tech: Tech }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-base font-bold text-muted-foreground">
        {tech.name[0]}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
      alt=""
      width={40}
      height={40}
      draggable={false}
      onError={() => setFailed(true)}
      className={`h-10 w-10 object-contain ${tech.invert ? "dark:invert" : ""}`}
    />
  );
}

function Floating({
  y,
  delay,
  className,
  children,
}: {
  y: MotionValue<number>;
  delay: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2.5 rounded-2xl border bg-card/80 px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Hero({ s }: { s: Service }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const Icon = s.icon;

  const words = s.title.split(" ");
  const last = words.pop();
  const chipPos = ["left-0 top-2", "right-0 top-[44%]", "bottom-4 left-4"];
  const chipY = [y1, y2, y3];

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 text-foreground opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 65% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 65% 40%, black 20%, transparent 70%)",
        }}
      />
      <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
      <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="container relative mx-auto px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb title={s.title} />

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {words.join(" ")} <Gradient>{last}</Gradient>
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-xl text-xl font-medium"
            >
              {s.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 max-w-xl text-lg text-muted-foreground"
            >
              {s.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]`}
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#features" className="inline-flex items-center rounded-full border px-7 py-3.5 font-semibold transition-colors hover:bg-muted">
                What&apos;s included
              </a>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="relative mx-auto h-[360px] w-full max-w-md sm:h-[420px]"
          >
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-blue-500/30 motion-reduce:animate-none" />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/60 dark:border-slate-700" />
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 [animation-duration:3s]" />
              <motion.span
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT} text-white shadow-2xl shadow-blue-500/30`}
              >
                <Icon className="h-14 w-14" strokeWidth={1.5} />
              </motion.span>
            </div>

            {s.highlights.map((h, i) => (
              <Floating key={h} y={chipY[i]} delay={i} className={chipPos[i]}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </Floating>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Service["features"][number]; index: number }) {
  const Icon = feature.icon;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(59,130,246,0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.7, ease: EASE }}
      whileHover={{ y: -6 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-colors hover:border-blue-500/40"
    >
      <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span aria-hidden className="absolute right-6 top-4 text-6xl font-black tabular-nums text-foreground/[0.05]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative">
        <span className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:rotate-6`}>
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.text}</p>
      </div>
    </motion.div>
  );
}

function Features({ s }: { s: Service }) {
  return (
    <section id="features" className="container mx-auto scroll-mt-24 px-4 py-24 sm:px-8">
      <SectionTitle>
        What&apos;s <Gradient>included</Gradient>
      </SectionTitle>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {s.features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function TechSection({ s }: { s: Service }) {
  return (
    <section className="border-y bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionTitle>
          Technologies we <Gradient>use</Gradient>
        </SectionTitle>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {s.tech.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 14 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center gap-3 rounded-3xl border bg-card p-6 transition-colors hover:border-blue-500/40"
            >
              <div className="opacity-70 grayscale transition duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">
                <TechLogo tech={t} />
              </div>
              <span className="text-sm font-semibold">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });

  return (
    <section className="container mx-auto px-4 py-24 sm:px-8">
      <SectionTitle>
        How we <Gradient>work</Gradient>
      </SectionTitle>
      <div ref={ref} className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-4 lg:gap-8">
        <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-border lg:block" />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className={`absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 origin-left bg-gradient-to-r ${GRADIENT} lg:block`}
        />
        {PROCESS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
            className="relative text-center"
          >
            <span className={`relative mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT} text-lg font-bold text-white shadow-lg shadow-blue-500/25 ring-8 ring-background`}>
              {i + 1}
            </span>
            <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
            <p className="mx-auto max-w-xs text-muted-foreground">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Faq({ s }: { s: Service }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionTitle>
          Frequently asked <Gradient>questions</Gradient>
        </SectionTitle>
        <div className="mx-auto max-w-3xl space-y-3">
          {s.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className={`overflow-hidden rounded-2xl border bg-card transition-colors ${isOpen ? "border-blue-500/40" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
                >
                  {f.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isOpen ? `bg-gradient-to-br ${GRADIENT} text-white` : "bg-muted"}`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Related({ slug }: { slug: string }) {
  const others = Object.values(SERVICES).filter((x) => x.slug !== slug);
  return (
    <section className="container mx-auto px-4 py-24 sm:px-8">
      <SectionTitle>
        Explore other <Gradient>services</Gradient>
      </SectionTitle>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {others.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.div
              key={o.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <Link href={`/services/${o.slug}`} className="group flex h-full flex-col rounded-3xl border bg-card p-8 transition-colors hover:border-blue-500/40">
                <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white transition-transform duration-300 group-hover:rotate-6`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-xl font-bold">{o.title}</h3>
                <p className="mb-6 flex-1 text-sm text-muted-foreground">{o.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-cyan-400">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CallToAction({ title }: { title: string }) {
  return (
    <section className="container mx-auto px-4 pb-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${GRADIENT} px-8 py-16 text-center text-white sm:px-16 sm:py-20`}
      >
        <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-white/10" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to start your {title} project?
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          Tell us about your idea and we&apos;ll come back with a plan, timeline and estimate.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
        >
          Book a free consultation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ---------- entry ---------- */

export function ServiceDetail({ slug }: { slug: string }) {
  const service = SERVICES[slug];
  if (!service) return null;

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero s={service} />
        <Features s={service} />
        <TechSection s={service} />
        <Process />
        <Faq s={service} />
        <Related slug={slug} />
        <CallToAction title={service.title} />
      </main>
    </MotionConfig>
  );
}