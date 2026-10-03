"use client";

import { techIconUrl } from "@/lib/tech-icon-url";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Cloud,
  Cog,
  Cpu,
  Database,
  Layout,
  Server,
  Smartphone,
} from "lucide-react";

/**
 * Logos: Simple Icons CDN, official brand colors.
 *   https://cdn.simpleicons.org/<slug>/<hex>
 * If a logo fails to load (brand removed from the set, offline, blocked),
 * a letter tile is shown instead. Swap the slug or use react-icons/si if needed.
 */
type Tech = { name: string; slug: string; color: string; invert?: boolean };
const T = (name: string, slug: string, color: string, invert = false): Tech => ({
  name,
  slug,
  color,
  invert,
});

const CATEGORIES = [
  {
    name: "Frontend",
    icon: Layout,
    skills: [
      T("React", "react", "61DAFB"),
      T("Next.js", "nextdotjs", "000000", true),
      T("Vue", "vuedotjs", "4FC08D"),
      T("Tailwind", "tailwindcss", "06B6D4"),
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      T("Node.js", "nodedotjs", "5FA04E"),
      T("Python", "python", "3776AB"),
      T("Go", "go", "00ADD8"),
      T("Java", "openjdk", "ED8B00"),
    ],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    skills: [
      T("React Native", "react", "61DAFB"),
      T("Flutter", "flutter", "02569B"),
      T("Swift", "swift", "F05138"),
      T("Kotlin", "kotlin", "7F52FF"),
    ],
  },
  {
    name: "Cloud",
    icon: Cloud,
    skills: [
      T("AWS", "amazonaws", "FF9900"),
      T("GCP", "googlecloud", "4285F4"),
      T("Azure", "microsoftazure", "0078D4"),
      T("Vercel", "vercel", "000000", true),
    ],
  },
  {
    name: "Database",
    icon: Database,
    skills: [
      T("PostgreSQL", "postgresql", "4169E1"),
      T("MongoDB", "mongodb", "47A248"),
      T("Redis", "redis", "FF4438"),
      T("MySQL", "mysql", "4479A1"),
    ],
  },
  {
    name: "DevOps",
    icon: Cog,
    skills: [
      T("Docker", "docker", "2496ED"),
      T("Kubernetes", "kubernetes", "326CE5"),
      T("CI/CD", "githubactions", "2088FF"),
      T("Terraform", "terraform", "844FBA"),
    ],
  },
  {
    name: "AI / ML",
    icon: Cpu,
    skills: [
      T("OpenAI", "openai", "000000", true),
      T("LangChain", "langchain", "1C3C3C", true),
      T("TensorFlow", "tensorflow", "FF6F00"),
      T("PyTorch", "pytorch", "EE4C2C"),
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const RADIUS = 165; // orbit radius in px (stage is 460px square)
const TILE = 88;

function TechLogo({ tech, size = 36 }: { tech: Tech; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className="flex items-center justify-center rounded-lg bg-slate-200 text-sm font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200"
        style={{ width: size, height: size }}
      >
        {tech.name[0]}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={techIconUrl(tech)}
      alt={`${tech.name} logo`}
      width={size}
      height={size}
      draggable={false}
      onError={() => setFailed(true)}
      className={tech.invert ? "dark:invert" : ""}
      style={{ width: size, height: size }}
    />
  );
}

/** One logo riding the orbit. Position is computed from a shared angle. */
function OrbitLogo({
  tech,
  index,
  count,
  angle,
}: {
  tech: Tech;
  index: number;
  count: number;
  angle: MotionValue<number>;
}) {
  const offset = (index / count) * Math.PI * 2;
  const x = useTransform(angle, (a) => Math.cos(a + offset) * RADIUS);
  const y = useTransform(angle, (a) => Math.sin(a + offset) * RADIUS);

  return (
    <motion.div
      style={{ x, y, width: TILE, height: TILE, marginLeft: -TILE / 2, marginTop: -TILE / 2 }}
      className="absolute left-1/2 top-1/2"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.08 }}
        whileHover={{ scale: 1.15 }}
        className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
      >
        <TechLogo tech={tech} />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Ring({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute left-1/2 top-1/2 rounded-full border ${className}`}
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
    />
  );
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const paused = useRef(false);
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];
  const Icon = cat.icon;

  // Orbit angle = slow constant spin + extra turn driven by page scroll
  const spin = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const angle = useTransform(
    [spin, scrollYProgress],
    ([s, p]: number[]) => s + p * Math.PI * 2
  );
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useAnimationFrame((_, delta) => {
    if (paused.current || reduceMotion || !inView) return;
    spin.set(spin.get() + delta * 0.0003);
  });

  // Cycle through categories automatically
  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % CATEGORIES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active, inView, reduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950 md:py-32"
      >
        {/* Dot grid + drifting glow */}
        <div
          aria-hidden
          className="absolute inset-0 text-slate-900 opacity-[0.07] dark:text-white"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
        />

        <div
          className="relative mx-auto grid max-w-7xl items-center gap-x-16 gap-y-12 px-4 sm:px-8 lg:grid-cols-12"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {/* Heading */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  Built with Modern
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
                  Technologies
                </motion.span>
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-400"
            >
              We use best-in-class tools and frameworks to build scalable,
              secure and future-proof digital products.
            </motion.p>
          </div>

          {/* Orbit stage */}
          <div className="relative mx-auto h-[350px] w-full max-w-[460px] sm:h-[460px] lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 scale-[0.75] sm:scale-100">
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Ring size={430} className="animate-[spin_80s_linear_infinite] border-dotted border-slate-300 dark:border-slate-700" />
                <Ring size={RADIUS * 2} className="border-dashed border-blue-500/30" />
                <Ring size={190} className="border-slate-200 dark:border-slate-800" />

                {/* Hub */}
                <div className="absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32">
                  <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 [animation-duration:3s]" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ scale: 0.6, opacity: 0, rotate: -25 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.6, opacity: 0, rotate: 25, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-white shadow-2xl shadow-blue-500/30"
                    >
                      <Icon size={34} />
                      <span className="text-sm font-semibold">{cat.name}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Orbiting logos */}
                <AnimatePresence mode="wait">
                  <motion.div key={active} className="absolute inset-0" exit={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    {cat.skills.map((tech, i) => (
                      <OrbitLogo
                        key={tech.name}
                        tech={tech}
                        index={i}
                        count={cat.skills.length}
                        angle={angle}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Category picker */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7 lg:row-start-2">
            {CATEGORIES.map((c, i) => {
              const isActive = i === active;
              const CIcon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  className="last:odd:col-span-2"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? "border-transparent text-white"
                        : "border-slate-200 bg-white/60 text-slate-800 hover:border-blue-500/40 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-category"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 shadow-lg shadow-blue-500/25"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-white/20"
                          : "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-cyan-400"
                      }`}
                    >
                      <CIcon size={20} />
                    </span>
                    <span className="relative">
                      <span className="block font-semibold">{c.name}</span>
                      <span
                        className={`block text-sm ${
                          isActive ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {c.skills.map((s) => s.name).slice(0, 2).join(", ")} +{c.skills.length - 2}
                      </span>
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}