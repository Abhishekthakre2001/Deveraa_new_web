"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

import appImg1 from "@/app/assets/abacus-mobile-app1.jpeg";
import appImg2 from "@/app/assets/abacus-mobile-app2.jpeg";
import appImg3 from "@/app/assets/abacus-mobile-app3.jpeg";
// TODO: replace 4-6 with your own unique screenshots
import appImg4 from "@/app/assets/abacus-mobile-app1.jpeg";
import appImg5 from "@/app/assets/abacus-mobile-app2.jpeg";
import appImg6 from "@/app/assets/abacus-mobile-app3.jpeg";

const SCREENS = [
  { img: appImg1, title: "Everything at a glance", text: "Your accounts and activity, one calm dashboard." },
  { img: appImg2, title: "Move money in seconds", text: "Send, split and settle with a couple of taps." },
  { img: appImg3, title: "Know where it goes", text: "Spending sorted automatically as it happens." },
  { img: appImg4, title: "Goals that stay on track", text: "Set a target and watch the progress build." },
  { img: appImg5, title: "Reports you can share", text: "Clear summaries, ready when you need them." },
  { img: appImg6, title: "Yours on every device", text: "Pick up exactly where you left off." },
];

const N = SCREENS.length;
const SEG = 1 / N; // swipes happen for cards 0..N-2, last segment is the finale

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function SwipeCard({
  index,
  progress,
  reduce,
}: {
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const isLast = index === N - 1;
  const dir = index % 2 === 0 ? -1 : 1;
  const start = index * SEG;
  const end = (index + 1) * SEG;

  // Exit swipe
  const x = useTransform(progress, [start, end], ["0%", `${dir * 85}%`]);
  const exitY = useTransform(progress, [start, end], ["0%", "14%"]);
  const rotate = useTransform(progress, [start, end], [0, dir * 24]);
  const exitOpacity = useTransform(progress, [start, start + SEG * 0.75, end], [1, 1, 0]);

  // Stack depth: cards waiting underneath sit slightly smaller & lower
  const depth = useTransform(progress, (v) => clamp(index - v * N, 0, 4));
  const scale = useTransform(depth, (d) => (isLast ? 1 - d * 0.05 : 1 - d * 0.05));
  const stackY = useTransform(depth, (d) => d * 22);
  const stackOpacity = useTransform(depth, [0, 3, 4], [1, 0.9, 0]);
  const blur = useTransform(depth, (d) => `blur(${d * 1.2}px) brightness(${1 - d * 0.04})`);

  // Finale: last card lifts and glows
  const finale = useTransform(progress, [1 - SEG, 1], [1, 1.06]);

  return (
    <motion.div
      style={{
        x: reduce ? 0 : x,
        y: reduce ? stackY : stackY,
        rotate: reduce ? 0 : rotate,
        scale: isLast ? finale : scale,
        opacity: isLast ? stackOpacity : exitOpacity,
        filter: blur,
        zIndex: N - index,
        translateY: exitY,
      }}
      className="absolute inset-0 origin-bottom overflow-hidden rounded-[2.25rem] shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)] ring-1 ring-white/70"
    >
      <motion.div style={{ opacity: stackOpacity }} className="absolute inset-0">
        <Image
          src={SCREENS[index].img}
          alt={SCREENS[index].title}
          fill
          sizes="(min-width: 768px) 400px, 300px"
          className="object-contain"
          priority={index < 2}
        />
      </motion.div>
      {/* glass sheen */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-white/25 via-transparent to-transparent" />
    </motion.div>
  );
}

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery smoothing on top of raw scroll
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  useMotionValueEvent(progress, "change", (v) => {
    setActive(clamp(Math.round(v * N - 0.35), 0, N - 1));
  });

  // Background / glow parallax
  const glowRotate = useTransform(progress, [0, 1], [0, 220]);
  const orbA = useTransform(progress, [0, 1], ["0%", "-30%"]);
  const orbB = useTransform(progress, [0, 1], ["0%", "35%"]);
  const phoneTilt = useTransform(progress, [0, 0.5, 1], [-6, 4, -2]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section className="relative bg-gradient-to-b from-white via-indigo-50/70 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div ref={containerRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          {/* Soft mesh gradient */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_15%,rgba(196,181,253,0.45),transparent),radial-gradient(50%_45%_at_85%_25%,rgba(125,211,252,0.40),transparent),radial-gradient(55%_50%_at_60%_95%,rgba(253,186,116,0.30),transparent)] dark:opacity-40"
          />
          {/* Floating orbs */}
          <motion.div
            aria-hidden
            style={{ y: orbA }}
            animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl"
          />
          <motion.div
            aria-hidden
            style={{ y: orbB }}
            animate={reduce ? undefined : { scale: [1.1, 0.95, 1.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl"
          />

          {/* Sparkles */}
          {!reduce &&
            [
              { l: "12%", t: "22%", d: 0 },
              { l: "82%", t: "18%", d: 0.8 },
              { l: "20%", t: "72%", d: 1.6 },
              { l: "76%", t: "68%", d: 2.2 },
              { l: "50%", t: "8%", d: 1.2 },
            ].map((s, i) => (
              <motion.span
                key={i}
                aria-hidden
                style={{ left: s.l, top: s.t }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
                className="absolute h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_12px_4px_rgba(129,140,248,0.7)]"
              />
            ))}

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-16">
            {/* Left: phone stage */}
            <motion.div
              style={{ rotate: reduce ? 0 : phoneTilt, perspective: 1200 }}
              className="relative flex justify-center"
            >
              <motion.div
                aria-hidden
                style={{ rotate: glowRotate }}
                className="absolute inset-0 m-auto h-[85%] w-[85%] rounded-full bg-[conic-gradient(from_0deg,rgba(167,139,250,0.55),rgba(56,189,248,0.5),rgba(251,191,146,0.5),rgba(167,139,250,0.55))] opacity-70 blur-3xl"
              />
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ aspectRatio: `${appImg1.width} / ${appImg1.height}` }}
                className="relative h-[46vh] max-h-[560px] md:h-[62vh]"
              >
                <div className="absolute -inset-2 rounded-[2.75rem] bg-white/50 shadow-[0_40px_100px_-30px_rgba(79,70,229,0.5)] ring-1 ring-white/80 backdrop-blur-xl dark:bg-white/10 dark:ring-white/20" />
                {SCREENS.map((_, i) => (
                  <SwipeCard key={i} index={i} progress={progress} reduce={reduce} />
                ))}
              </motion.div>
            </motion.div>

            {/* Right: text */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mb-3 bg-gradient-to-r from-slate-900 via-indigo-700 to-sky-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl dark:from-white dark:via-indigo-200 dark:to-sky-300">
                  Experience the App
                </h2>
                <p className="max-w-md text-slate-600 md:mx-0 dark:text-slate-400">
                  Scroll to swipe through every screen.
                </p>
              </motion.div>

              <div className="mt-6 h-24 md:mt-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="text-xl font-semibold text-slate-900 md:text-2xl dark:text-white">
                      {SCREENS[active].title}
                    </p>
                    <p className="mt-1 max-w-sm text-slate-600 dark:text-slate-400">
                      {SCREENS[active].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-col items-center gap-3 md:items-start">
                <div className="flex gap-2">
                  {SCREENS.map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ width: i === active ? 24 : 6, opacity: i <= active ? 1 : 0.35 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="h-1.5 rounded-full bg-indigo-500"
                    />
                  ))}
                </div>
                <div className="h-0.5 w-40 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700">
                  <motion.div
                    style={{ scaleX: barScale }}
                    className="h-full origin-left bg-gradient-to-r from-violet-400 to-sky-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}