"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  Landmark,
  Truck,
  GraduationCap,
  Building2,
  Factory,
  ShoppingCart,
  Lightbulb,
} from "lucide-react";

const INDUSTRIES = [
  { name: "Healthcare", icon: Activity, color: "from-emerald-600 to-green-400", text: "Patient portals, telehealth and records systems built for compliance.", tags: ["Telehealth", "EHR", "HIPAA"] },
  { name: "FinTech", icon: Landmark, color: "from-blue-700 to-cyan-500", text: "Payments, lending and trading products that stay fast and secure.", tags: ["Payments", "Lending", "KYC"] },
  { name: "Logistics", icon: Truck, color: "from-orange-600 to-amber-400", text: "Fleet tracking, routing and warehouse tools with live visibility.", tags: ["Fleet", "Routing", "Warehouse"] },
  { name: "Education", icon: GraduationCap, color: "from-purple-600 to-fuchsia-400", text: "Learning platforms and course tools that keep students engaged.", tags: ["LMS", "Live classes", "Assessments"] },
  { name: "Real Estate", icon: Building2, color: "from-rose-600 to-pink-400", text: "Listing, leasing and property apps that buyers enjoy using.", tags: ["Listings", "Leasing", "CRM"] },
  { name: "Manufacturing", icon: Factory, color: "from-slate-700 to-slate-500", text: "Shop-floor dashboards and inventory systems that cut downtime.", tags: ["IoT", "Inventory", "ERP"] },
  { name: "Retail", icon: ShoppingCart, color: "from-indigo-600 to-blue-400", text: "Storefronts, checkout and loyalty features that lift conversion.", tags: ["Storefront", "Checkout", "Loyalty"] },
  { name: "AI Startups", icon: Lightbulb, color: "from-yellow-600 to-orange-500", text: "From prototype to production: model-powered products, shipped fast.", tags: ["MVP", "LLM apps", "Data pipelines"] },
];

const N = INDUSTRIES.length;
const STEP = 360 / N;
const SCROLL_PER_ITEM = 70; // vh of scroll per industry

function Node({
  industry,
  index,
  pos,
  base,
  onClick,
}: {
  industry: (typeof INDUSTRIES)[number];
  index: number;
  pos: MotionValue<number>;
  base: MotionValue<number>;
  onClick: () => void;
}) {
  const Icon = industry.icon;
  // Ring angle for this node, driven directly by scroll
  const wrapRot = useTransform([pos, base], ([p, b]: number[]) => index * STEP - p * STEP + b);
  const childRot = useTransform(wrapRot, (r) => -r); // keeps icon upright
  const close = useTransform(pos, (p) => Math.max(0, 1 - Math.abs(p - index)));
  const scale = useTransform(close, (c) => 0.8 + 0.5 * c);
  const opacity = useTransform(close, (c) => 0.5 + 0.5 * c);

  return (
    <motion.div style={{ rotate: wrapRot }} className="pointer-events-none absolute inset-0">
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={industry.name}
        style={{ rotate: childRot, scale, opacity }}
        className="pointer-events-auto absolute left-0 top-1/2 -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 md:-ml-8 md:-mt-8 md:h-16 md:w-16"
      >
        <motion.span
          style={{ opacity: close }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${industry.color}`}
        />
        <motion.span style={{ color: useTransform(close, (c) => (c > 0.5 ? "#ffffff" : "currentColor")) }} className="relative">
          <Icon className="h-6 w-6" />
        </motion.span>
        <span className="absolute right-full mr-3 hidden whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400 md:block">
          {industry.name}
        </span>
      </motion.button>
    </motion.div>
  );
}

export function IndustriesSection() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const base = useMotionValue(0); // 0 = active node sits at 9 o'clock (desktop), 90 = 12 o'clock (mobile)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => base.set(mq.matches ? 0 : 90);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [base]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0.04, 0.92], [0, N - 1], { clamp: true });
  const pos = useSpring(raw, reduce ? { duration: 0 } : { stiffness: 90, damping: 26 });
  const ringSpin = useTransform(pos, (p) => p * 20); // slow drift of decorative rings

  useMotionValueEvent(pos, "change", (v) => setActive(Math.round(v)));

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * (0.04 + (i / (N - 1)) * 0.88), behavior: reduce ? "auto" : "smooth" });
  };

  const cur = INDUSTRIES[active];

  return (
    <section
      ref={ref}
      style={{ height: `calc(100vh + ${N * SCROLL_PER_ITEM}vh)` }}
      className="relative bg-white dark:bg-slate-950"
    >
      <div className="sticky top-0 h-screen max-h-screen overflow-hidden">
        {/* Dot grid, faded at the edges */}
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle,rgba(100,116,139,0.25)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        {/* Text column */}
        <div className="container relative z-10 mx-auto flex h-full flex-col px-4 pb-[58vw] pt-20 sm:px-8 md:max-w-none md:pb-10 md:pr-[52vw]">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            Built for the industries that move first
          </motion.h2>

          <div className="flex flex-1 flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.name}
                initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -30, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                <h3 className={`bg-gradient-to-r ${cur.color} bg-clip-text pb-2 text-5xl font-extrabold leading-none tracking-tight text-transparent sm:text-6xl md:text-8xl`}>
                  {cur.name}
                </h3>
                <p className="mt-4 max-w-md text-base text-slate-600 dark:text-slate-400 md:mt-6 md:text-xl">
                  {cur.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 md:mt-8">
                  {cur.tags.map((t) => (
                    <span key={t} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="hidden text-sm text-slate-500 dark:text-slate-500 md:block">
            Scroll to turn the wheel, or click an industry.
          </p>
        </div>

        {/* Dial: half of it is cut off by the screen edge */}
        <div className="absolute bottom-0 left-1/2 aspect-square w-[112vw] -translate-x-1/2 translate-y-1/2 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:w-[min(96vh,62vw)] md:-translate-y-1/2 md:translate-x-1/2">
          {/* Colour glow behind the active industry */}
          <AnimatePresence>
            <motion.div
              key={cur.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.22 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-[22%] rounded-full bg-gradient-to-br ${cur.color} blur-3xl`}
            />
          </AnimatePresence>

          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-slate-300 dark:border-slate-700" />
          <motion.div style={{ rotate: ringSpin }} className="absolute inset-[9%] rounded-full border border-dashed border-slate-300 dark:border-slate-700" />
          <motion.div style={{ rotate: useTransform(ringSpin, (r) => -r) }} className="absolute inset-[24%] rounded-full border border-dashed border-slate-300/80 dark:border-slate-800" />
          <div className="absolute inset-[40%] rounded-full border border-slate-200 dark:border-slate-800" />

          {/* Pointer line from active node toward the text (desktop) */}
          <div className="absolute right-full top-1/2 mr-10 hidden h-px w-32 bg-gradient-to-l from-slate-400 to-transparent md:block" />

          {INDUSTRIES.map((ind, i) => (
            <Node key={ind.name} industry={ind} index={i} pos={pos} base={base} onClick={() => jumpTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}