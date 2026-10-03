"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Home,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

// Placeholder numbers: replace with your real figures
const STATS = [
  { to: 50, suffix: "+", decimals: 0, label: "Projects shipped" },
  { to: 30, suffix: "+", decimals: 0, label: "Happy clients" },
  { to: 12, suffix: "", decimals: 0, label: "Countries served" },
  { to: 99.9, suffix: "%", decimals: 1, label: "Average uptime" },
];

const MISSION =
  "We believe great software is more than clean code. It is a clear strategy, honest communication and a product people love to use.";

const VALUES = [
  {
    icon: Code2,
    title: "Engineering first",
    text: "Clean, tested and maintainable code that keeps scaling with your business.",
  },
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    text: "Clear communication and honest timelines, from kickoff all the way to launch.",
  },
  {
    icon: Lightbulb,
    title: "Product thinking",
    text: "We challenge assumptions and shape raw ideas into products people want.",
  },
  {
    icon: Users,
    title: "Long-term partnership",
    text: "We stay after launch to support, measure and evolve what we build together.",
  },
];

const JOURNEY = [
  {
    title: "The idea",
    text: "DevEraa started with a simple belief: businesses deserve software built with the same care as their best products.",
  },
  {
    title: "First launches",
    text: "Early projects taught us to ship fast, listen closely and measure what matters.",
  },
  {
    title: "Growing the team",
    text: "We brought together engineers, designers and strategists who genuinely care about craft.",
  },
  {
    title: "Today",
    text: "A full-service team building web, mobile, cloud and AI products for clients around the world.",
  },
];

/* ---------- small pieces ---------- */

function Breadcrumb() {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ol className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm backdrop-blur">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
          About
        </li>
      </ol>
    </motion.nav>
  );
}

function CountUp({
  to,
  decimals,
  suffix,
}: {
  to: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Card that drifts at its own speed while scrolling and gently floats */
function Floating({
  y,
  delay = 0,
  className,
  children,
}: {
  y: MotionValue<number>;
  delay?: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="rounded-2xl border bg-card/80 shadow-xl backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A word that fades in as the page scrolls */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const scores = [
    { label: "Performance", value: 98 },
    { label: "Accessibility", value: 100 },
    { label: "Best practices", value: 96 },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Dot grid and glows */}
      <div
        aria-hidden
        className="absolute inset-0 text-foreground opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      />

      <div className="container relative mx-auto px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb />

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  About
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className={`block bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
                >
                  Deveraa
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
            >
              We are a premium software development company committed to building
              modern, high-performance solutions for forward-thinking brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]`}
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#story"
                className="inline-flex items-center rounded-full border px-7 py-3.5 font-semibold transition-colors hover:bg-muted"
              >
                Our story
              </a>
            </motion.div>
          </div>

          {/* Floating visual replaces the image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="relative mx-auto h-[420px] w-full max-w-md lg:max-w-none"
          >
            <Floating y={yMain} className="left-0 top-14 w-[82%]">
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {scores.map((s, i) => (
                    <div key={s.label}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="text-muted-foreground">{s.label}</span>
                        <span className="font-semibold tabular-nums">{s.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${GRADIENT}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.value}%` }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 1.2, ease: EASE }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" />
                  Deployed successfully
                </div>
              </div>
            </Floating>

            <Floating y={yTop} delay={1} className="right-0 top-0">
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none">99.9%</p>
                  <p className="mt-1 text-xs text-muted-foreground">Uptime</p>
                </div>
              </div>
            </Floating>

            <Floating y={yBottom} delay={2} className="bottom-0 right-2">
              <div className="flex items-center gap-3 p-4">
                <div className="flex -space-x-2">
                  {["from-cyan-500 to-blue-600", "from-violet-500 to-fuchsia-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600"].map(
                    (g, i) => (
                      <span
                        key={i}
                        className={`h-8 w-8 rounded-full border-2 border-card bg-gradient-to-br ${g}`}
                      />
                    )
                  )}
                </div>
                <p className="text-sm font-semibold">Global team</p>
              </div>
            </Floating>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto grid grid-cols-2 gap-y-10 px-4 py-14 sm:px-8 lg:grid-cols-4 lg:divide-x">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
            className="px-4 text-center"
          >
            <p
              className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-4xl font-bold tabular-nums text-transparent sm:text-5xl`}
            >
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = MISSION.split(" ");

  return (
    <section id="story" className="container mx-auto scroll-mt-24 px-4 py-28 sm:px-8">
      <p
        ref={ref}
        className="mx-auto max-w-4xl text-3xl font-semibold leading-snug tracking-tight sm:text-4xl md:text-5xl"
      >
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Values() {
  return (
    <section className="container mx-auto px-4 pb-28 sm:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-5xl"
      >
        What{" "}
        <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>
          drives us
        </span>
      </motion.h2>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {VALUES.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.12, duration: 0.7, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-colors hover:border-blue-500/40"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:rotate-6`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="relative mb-2 text-xl font-bold">{v.title}</h3>
              <p className="relative text-muted-foreground">{v.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });

  return (
    <section className="border-t bg-muted/30 py-28">
      <div className="container mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-5xl"
        >
          How we got here
        </motion.h2>

        <div ref={ref} className="relative mx-auto max-w-2xl pl-12">
          {/* Track and scroll-filled line */}
          <div className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-border" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className={`absolute bottom-2 left-[15px] top-2 w-0.5 origin-top bg-gradient-to-b ${GRADIENT}`}
          />

          <div className="space-y-14">
            {JOURNEY.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative"
              >
                <span
                  className={`absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT} text-sm font-bold text-white ring-4 ring-background`}
                >
                  {i + 1}
                </span>
                <h3 className="mb-2 text-xl font-bold">{j.title}</h3>
                <p className="text-muted-foreground">{j.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-24 sm:px-8">
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
          Let&apos;s build something great together
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          Tell us about your idea and we&apos;ll help you turn it into a product
          your customers will love.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Stats />
        <Mission />
        <Values />
        <Journey />
        <CallToAction />
      </main>
    </MotionConfig>
  );
}