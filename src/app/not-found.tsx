"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Compass,
  Ghost,
  Home,
  Layers,
  Mail,
  SearchX,
  Unlink,
  Users,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

const QUICK_LINKS = [
  { name: "Services", href: "/services", icon: Layers },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "About", href: "/about", icon: Users },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

/** Icon bubble that floats and shifts with the cursor */
function Chip({
  icon: Icon,
  x,
  y,
  delay,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  delay: number;
  className: string;
}) {
  return (
    <motion.div style={{ x, y }} className={`absolute hidden lg:block ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 + delay * 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card/80 shadow-xl backdrop-blur"
        >
          <Icon className="h-7 w-7 text-blue-600 dark:text-cyan-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** A big "4" that drops in, then bobs gently */
function Digit({ delay, tone }: { delay: number; tone: string }) {
  return (
    <motion.span
      initial={{ y: -140, opacity: 0, rotate: -12 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12, delay }}
      className="inline-block"
    >
      <motion.span
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className={`inline-block bg-gradient-to-br ${tone} bg-clip-text pb-[0.05em] text-transparent`}
      >
        4
      </motion.span>
    </motion.span>
  );
}

export default function NotFound() {
  const router = useRouter();

  // Cursor-driven parallax: each layer moves by a different amount
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const digitsX = useTransform(smx, (v) => v * 24);
  const digitsY = useTransform(smy, (v) => v * 24);
  const chipsX = useTransform(smx, (v) => v * -50);
  const chipsY = useTransform(smy, (v) => v * -50);
  const blobX = useTransform(smx, (v) => v * -80);
  const blobY = useTransform(smy, (v) => v * -80);

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="relative flex min-h-screen flex-col justify-center overflow-hidden"
        onMouseMove={(e) => {
          mx.set(e.clientX / window.innerWidth - 0.5);
          my.set(e.clientY / window.innerHeight - 0.5);
        }}
      >
        {/* Background */}
        <div
          aria-hidden
          className="absolute inset-0 text-foreground opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          style={{ x: blobX, y: blobY }}
          className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
        />
        <motion.div
          aria-hidden
          style={{ x: blobX, y: blobY }}
          className="pointer-events-none absolute -left-24 bottom-16 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        />

        <Chip icon={Ghost} x={chipsX} y={chipsY} delay={0} className="left-[10%] top-[30%]" />
        <Chip icon={SearchX} x={chipsX} y={chipsY} delay={1} className="right-[10%] top-[28%]" />
        <Chip icon={Unlink} x={chipsX} y={chipsY} delay={2} className="right-[16%] top-[66%]" />

        <div className="container relative mx-auto px-4 pb-24 pt-32 text-center sm:px-8">
          {/* Giant 404 (decorative) */}
          <motion.div
            aria-hidden
            style={{ x: digitsX, y: digitsY }}
            className="flex select-none items-center justify-center gap-[0.04em] text-[7.5rem] font-black leading-none sm:text-[12rem] lg:text-[16rem]"
          >
            <Digit delay={0} tone="from-cyan-500 to-blue-600" />

            {/* The zero: a ring with a compass that can't find north */}
            <motion.span
              initial={{ y: -140, opacity: 0, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.15 }}
              className="relative inline-block h-[0.72em] w-[0.68em]"
            >
              <span className="absolute -inset-[0.1em] animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-blue-500/40 motion-reduce:animate-none" />
              <span className="absolute -inset-[0.1em] animate-[spin_8s_linear_infinite] motion-reduce:animate-none">
                <span className="absolute left-1/2 top-0 h-[0.05em] w-[0.05em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_14px_3px_rgba(34,211,238,0.8)]" />
              </span>
              <span className="flex h-full w-full rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 p-[0.07em]">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-background">
                  <motion.span
                    animate={{ rotate: [0, 50, -35, 120, -70, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <Compass
                      strokeWidth={1.5}
                      className="text-blue-500"
                      style={{ width: "0.4em", height: "0.4em" }}
                    />
                  </motion.span>
                </span>
              </span>
            </motion.span>

            <Digit delay={0.3} tone="from-blue-600 to-violet-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
            className="mt-10 text-3xl font-bold tracking-tight sm:text-5xl"
          >
            <span className="sr-only">404: </span>
            Looks like you&apos;re{" "}
            <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>
              lost in space
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground"
          >
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/"
              className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]`}
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go back
            </button>
          </motion.div>

          {/* Quick links */}
          <div className="mx-auto mt-20 max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mb-5 text-sm font-semibold text-muted-foreground"
            >
              Or jump to a popular page
            </motion.p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {QUICK_LINKS.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15 + i * 0.07, duration: 0.5, ease: EASE }}
                    whileHover={{ y: -5 }}
                    className={i === QUICK_LINKS.length - 1 ? "col-span-2 sm:col-span-1" : ""}
                  >
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between gap-3 rounded-2xl border bg-card/70 p-4 backdrop-blur transition-colors hover:border-blue-500/40"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${GRADIENT} text-white transition-transform duration-300 group-hover:rotate-6`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-semibold">{l.name}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}