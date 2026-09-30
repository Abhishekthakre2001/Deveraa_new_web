"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    content:
      "Deveraa completely transformed our digital presence. Their engineering team is top-notch, delivering a complex SaaS platform ahead of schedule.",
    result: "Delivered ahead of schedule",
    accent: "#0891b2",
  },
  {
    name: "Michael Chen",
    role: "Founder, HealthSync",
    content:
      "The level of professionalism and technical expertise is unmatched. They didn't just build an app; they helped us refine our entire product strategy.",
    result: "Product strategy refined",
    accent: "#2563eb",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Product, Logistix",
    content:
      "Outstanding communication and flawless execution. Our new enterprise logistics dashboard has increased operational efficiency by 40%.",
    result: "40% more efficient",
    accent: "#7c3aed",
  },
  // Sample entries below: replace with real client feedback
  {
    name: "David Okafor",
    role: "Head of Engineering, PayLoop",
    content:
      "They took our fragile prototype and rebuilt it into a platform that scales. We went from monthly releases to deploying every single day.",
    result: "Daily deployments",
    accent: "#059669",
  },
  {
    name: "Priya Nair",
    role: "COO, EduSpark",
    content:
      "From the first workshop to launch, the team felt like part of ours. Our learners' app is now one of the best-rated in its category.",
    result: "4.8 app rating",
    accent: "#d97706",
  },
  {
    name: "Tom Becker",
    role: "Director, Northwind Retail",
    content:
      "Clean code, clear communication and no surprises on budget. Checkout conversion improved noticeably after the redesign.",
    result: "Higher checkout conversion",
    accent: "#db2777",
  },
];

// Placeholder numbers: replace with your real figures
const STATS = [
  { to: 50, suffix: "+", decimals: 0, label: "Projects delivered" },
  { to: 98, suffix: "%", decimals: 0, label: "Client satisfaction" },
  { to: 4.9, suffix: "", decimals: 1, label: "Average rating" },
];

const DURATION = 6000; // ms each testimonial stays in focus
const EASE = [0.22, 1, 0.36, 1] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

/** Number that counts up the first time it scrolls into view */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
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

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();
  const paused = useRef(false);
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgLeft = useTransform(scrollYProgress, [0, 1], ["8%", "-40%"]);
  const bgRight = useTransform(scrollYProgress, [0, 1], ["-40%", "8%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Autoplay driven by the progress bar (pauses on hover / off-screen)
  useAnimationFrame((_, delta) => {
    if (paused.current || !inView || reduceMotion) return;
    const next = progress.get() + delta / DURATION;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    } else {
      progress.set(next);
    }
  });

  const select = (i: number) => {
    setActive(i);
    progress.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-background py-24 md:py-32"
      >
        {/* Giant background words that drift as you scroll */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <motion.div
            style={{ x: bgLeft }}
            className="absolute top-4 whitespace-nowrap text-[9rem] font-black leading-none text-foreground/[0.035] md:text-[13rem]"
          >
            Trusted • Delivered • Recommended • Trusted • Delivered • Recommended
          </motion.div>
          <motion.div
            style={{ x: bgRight }}
            className="absolute bottom-4 whitespace-nowrap text-[9rem] font-black leading-none text-foreground/[0.035] md:text-[13rem]"
          >
            Real results • Real stories • Real results • Real stories • Real results
          </motion.div>
        </div>

        <div
          className="relative mx-auto grid max-w-7xl gap-x-12 gap-y-10 px-4 sm:px-8 lg:grid-cols-12"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {/* Heading: each line slides up from behind a mask */}
          <div className="lg:col-span-5 lg:row-start-1">
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  Trusted by Businesses
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
                >
                  Around the World
                </motion.span>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-md text-lg text-muted-foreground"
            >
              {
                "Our clients' success is our greatest achievement. Here is how we've helped them turn ambitious ideas into products people use."
              }
            </motion.p>
          </div>

          {/* Spotlight panel */}
          <motion.div
            style={{ y: panelY }}
            className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border bg-card p-8 shadow-xl sm:p-12"
            >
              {/* Accent glow that crossfades per testimonial */}
              <AnimatePresence>
                <motion.div
                  key={active}
                  aria-hidden
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background: `radial-gradient(60% 60% at 100% 0%, ${t.accent}33, transparent 70%)`,
                  }}
                />
              </AnimatePresence>

              {/* Oversized quote mark */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -top-8 right-8 font-serif text-[16rem] leading-none opacity-15"
                animate={{ color: t.accent }}
                transition={{ duration: 0.6 }}
              >
                ”
              </motion.span>

              {/* Quote: words blur in one by one */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  className="relative flex-1 text-2xl font-medium leading-snug sm:text-3xl"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  variants={{ show: { transition: { staggerChildren: 0.02 } } }}
                >
                  {t.content.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="mr-[0.28em] inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)" },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>

              <motion.div
                key={`meta-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: t.accent }}
                  >
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: t.accent }}
                    />
                    {t.result}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Client selector: vertical list on desktop, swipe strip on mobile */}
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:col-span-5 lg:row-start-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {TESTIMONIALS.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={item.name}
                  className="snap-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className={`relative flex w-full min-w-[15rem] items-center gap-4 rounded-2xl p-4 text-left transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:min-w-0 ${
                      isActive ? "" : "opacity-55 hover:opacity-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-row"
                        className="absolute inset-0 rounded-2xl border bg-card shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: item.accent }}
                    >
                      {initials(item.name)}
                    </span>
                    <span className="relative">
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {item.role}
                      </span>
                    </span>

                    {isActive && (
                      <span className="absolute inset-x-4 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-border">
                        <motion.span
                          className="block h-full origin-left"
                          style={{ scaleX: progress, background: item.accent }}
                        />
                      </span>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats count up on scroll */}
        <div className="relative px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto mt-24 grid max-w-4xl grid-cols-3 divide-x border-t pt-10 text-center"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-2">
                <p className="text-4xl font-bold tabular-nums sm:text-5xl">
                  <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}