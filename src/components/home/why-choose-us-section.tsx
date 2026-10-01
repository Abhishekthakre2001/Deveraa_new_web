"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Users, Zap, ShieldCheck, TrendingUp, Plus, Check, type LucideIcon } from "lucide-react";

/**
 * Deveraa — "Why choose us" / About section
 *
 * Concept: a light/dark editorial section with ONE memorable moment — a pinned
 * "stage" on the right that redraws itself for whichever promise the visitor
 * opens on the left. Everything else stays quiet.
 *
 * Optional: swap the headline font for a display serif via next/font
 * (e.g. Instrument Serif or Fraunces) and set it on `font-serif` in tailwind.config.
 */

type Item = {
  id: "eng" | "ship" | "sec" | "grow";
  icon: LucideIcon;
  title: string;
  summary: string;
  points: string[];
};

const ITEMS: Item[] = [
  {
    id: "eng",
    icon: Users,
    title: "Engineering you can trust",
    summary:
      "Senior engineers design systems that stay fast and maintainable long after launch.",
    points: ["Peer-reviewed code on every change", "Architecture built to scale", "Clean handover and documentation"],
  },
  {
    id: "ship",
    icon: Zap,
    title: "Shipped in weeks, not quarters",
    summary:
      "Short sprints and a working release every two weeks, so you see progress early.",
    points: ["Fixed scope per sprint", "Weekly updates, no surprises", "Launch-ready from the first release"],
  },
  {
    id: "sec",
    icon: ShieldCheck,
    title: "Security from day one",
    summary:
      "Security is part of the design, not a check at the end. We build to recognised compliance standards.",
    points: ["Encrypted data in transit and at rest", "Access control and audit trails", "Regular dependency and code scans"],
  },
  {
    id: "grow",
    icon: TrendingUp,
    title: "Built to grow your business",
    summary:
      "Every product is tuned for sign-ups, retention and revenue, and we measure it after launch.",
    points: ["Analytics set up before launch", "Conversion-focused UX", "Ongoing improvement after release"],
  },
];

/* ───────────────────────── Stage visuals ───────────────────────── */

function EngineeringStage() {
  const rows = [[56, 28], [38, 46, 16], [78], [30, 62], [48, 22, 22], [64, 20]];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-8">
      {rows.map((row, r) => (
        <div key={r} className="flex items-center gap-3">
          <span className="w-5 text-right text-xs text-slate-400 dark:text-slate-600">{r + 1}</span>
          <div className="flex flex-1 gap-2" style={{ paddingLeft: r % 3 === 1 ? 24 : 0 }}>
            {row.map((w, i) => (
              <motion.span
                key={i}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${w}%`, opacity: 1 }}
                transition={{ delay: r * 0.08 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                className={`h-2.5 rounded-full ${i === 0 ? "bg-blue-500 dark:bg-blue-400" : i === 1 ? "bg-slate-400 dark:bg-slate-500" : "bg-amber-400 dark:bg-amber-300"}`}
              />
            ))}
          </div>
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
      >
        <Check size={16} /> Review passed, merged
      </motion.div>
    </div>
  );
}

function ShipStage() {
  const phases = ["Discover", "Design", "Build", "Launch"];
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-8">
      {phases.map((p, i) => (
        <div key={p}>
          <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>{p}</span>
            <span>Week {i * 2 + 1}{i < 3 ? `–${i * 2 + 2}` : ""}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: i * 0.35, duration: 0.7, ease: "easeOut" }}
              className={`h-full rounded-full ${i === 3 ? "bg-amber-400 dark:bg-amber-300" : "bg-blue-500 dark:bg-blue-400"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SecurityStage() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-full items-center justify-center">
      {[220, 160, 100].map((size, i) => (
        <motion.div
          key={size}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: reduce ? 0 : i % 2 ? -360 : 360 }}
          transition={{
            scale: { delay: i * 0.12, duration: 0.6 },
            opacity: { delay: i * 0.12, duration: 0.6 },
            rotate: { duration: 40 + i * 15, repeat: Infinity, ease: "linear" },
          }}
          style={{ width: size, height: size }}
          className="absolute rounded-full border border-dashed border-blue-400/50 dark:border-blue-300/40"
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500 dark:bg-blue-400" />
        </motion.div>
      ))}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_0_60px_rgba(59,130,246,0.5)]">
        <ShieldCheck size={36} />
      </div>
    </div>
  );
}

function GrowthStage() {
  const d = "M10 200 C60 190 80 150 130 150 S200 110 250 90 S330 60 390 20";
  return (
    <div className="flex h-full flex-col justify-center px-8">
      <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Revenue rising over time">
        {[50, 100, 150, 200].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} className="stroke-slate-200 dark:stroke-white/10" />
        ))}
        <motion.path
          d={d}
          fill="none"
          className="stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.circle
          cx="390"
          cy="20"
          r="6"
          className="fill-amber-500 dark:fill-amber-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
        />
      </svg>
      <div className="mt-4 flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>Launch</span>
        <span>Month 6</span>
      </div>
    </div>
  );
}

const STAGES = { eng: EngineeringStage, ship: ShipStage, sec: SecurityStage, grow: GrowthStage };

/* ───────────────────────── Section ───────────────────────── */

export function WhyChooseUsSection() {
  const [active, setActive] = useState<Item["id"]>("eng");
  const current = ITEMS.find((i) => i.id === active)!;
  const Stage = STAGES[active];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-28 text-slate-900 sm:py-36 dark:bg-[#0a1020] dark:text-white">
      {/* quiet backdrop: one soft light, nothing else */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[140px] dark:bg-blue-600/20" />

      <div className="container relative mx-auto px-4 sm:px-8">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:col-span-8 lg:text-7xl"
          >
            Software that has to work on Monday morning.
          </motion.h2>
          <p className="max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400 lg:col-span-4">
            Deveraa is a team of engineers and product people. We build web and mobile products for
            businesses that need them to perform, and we keep you informed at every step.
          </p>
        </div>

        {/* Interactive body */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Accordion */}
          <div className="lg:col-span-6">
            <ul className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {ITEMS.map((item) => {
                const open = item.id === active;
                const Icon = item.icon;
                return (
                  <li key={item.id} className="relative">
                    {open && (
                      <motion.span
                        layoutId="active-bar"
                        className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-400"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setActive(item.id)}
                      aria-expanded={open}
                      aria-controls={`panel-${item.id}`}
                      className="group flex w-full items-center gap-5 py-6 pl-6 pr-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Icon
                        size={22}
                        className={open ? "text-blue-600 dark:text-blue-400" : "text-slate-500 transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-300"}
                      />
                      <span
                        className={`flex-1 font-serif text-2xl transition-colors sm:text-3xl ${
                          open ? "text-slate-900 dark:text-white" : "text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200"
                        }`}
                      >
                        {item.title}
                      </span>
                      <Plus
                        size={20}
                        className={`shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`panel-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-[68px] pr-4">
                            <p className="max-w-md leading-relaxed text-slate-600 dark:text-slate-400">{item.summary}</p>
                            <ul className="mt-5 space-y-2.5">
                              {item.points.map((pt) => (
                                <li key={pt} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                                  <Check size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Pinned stage */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:backdrop-blur">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Stage />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span>{current.title}</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  99% client satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}