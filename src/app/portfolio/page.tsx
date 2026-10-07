"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Home } from "lucide-react";
import abacusWebImg from "@/app/assets/abacus-web.jpeg";
import abacusMobileImg from "@/app/assets/abacus-mobile-app.jpeg";
import doorstepImg from "@/app/assets/doorstep-services-web.jpeg";
import ecommerceImg from "@/app/assets/e-commerce-web.jpeg";
import tradingAppImg from "@/app/assets/tradingmobileapp.jpeg";
import videoCallImg from "@/app/assets/viceo-call.jpeg";
import project1 from "@/app/assets/project/project1.png";
import project2 from "@/app/assets/project/project2.png";
import project3 from "@/app/assets/project/project3.png";
import project4 from "@/app/assets/project/project4.png";
import project5 from "@/app/assets/project/project5.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

// `tags` drive the filter buttons: adjust them to match each project
const PROJECTS = [
  { title: "Abacus Web Platform", image: project5, category: "Web Application", tags: ["Web"] },
  { title: "Abacus Mobile App", image: project5, category: "Mobile Application", tags: ["Mobile"] },
  { title: "Doorstep Services Platform", image: project2, category: "Web & Mobile Platform", tags: ["Web", "Mobile"] },
  { title: "E-Commerce Solution", image: project2, category: "E-commerce", tags: ["Web"] },
  { title: "Trading Mobile App", image: project4, category: "FinTech", tags: ["Mobile"] },
  { title: "Video Calling Integration", image: project3, category: "Communication", tags: ["Web", "Mobile"] },
];

const FILTERS = ["All", "Web", "Mobile"];

type Project = (typeof PROJECTS)[number];

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
          Portfolio
        </li>
      </ol>
    </motion.nav>
  );
}

/** A strip of project screenshots that slides sideways as you scroll */
function ThumbRow({ x }: { x: MotionValue<string> }) {
  return (
    <motion.div style={{ x }} className="flex w-max gap-4">
      {[...PROJECTS, ...PROJECTS].map((p, i) => (
        <div
          key={`${p.title}-${i}`}
          className="relative h-36 w-64 shrink-0 overflow-hidden rounded-2xl border bg-muted shadow-lg sm:h-44 sm:w-80"
        >
          <Image src={p.image} alt="" fill sizes="320px" className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Image slides slightly inside its frame while the card scrolls past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // 3D tilt that follows the cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.7, ease: EASE }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <motion.div style={{ y: imgY }} className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Hover overlay */}
          <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link
              href="/contact"
              className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform duration-300 group-hover:translate-y-0"
            >
              Want something similar?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <span className="absolute left-4 top-4 z-20 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/85 dark:text-slate-100">
            {project.category}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.tags.join(" · ")}
            </p>
          </div>
          {/* <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-violet-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden">
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
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      />

      <div className="container relative mx-auto px-4 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb />

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="inline-block overflow-hidden pb-2 align-top">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                Our
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-2 align-top">
              <motion.span
                className={`inline-block bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
              >
                Portfolio
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Explore our recent projects and success stories.
          </motion.p>
        </div>
      </div>

      {/* Scroll-linked screenshot rows */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
        className="relative mt-16 space-y-4 pb-24"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ThumbRow x={x1} />
        <ThumbRow x={x2} />
      </motion.div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = PROJECTS.filter((p) => filter === "All" || p.tags.includes(filter));

  return (
    <section id="projects" className="container mx-auto scroll-mt-24 px-4 py-24 sm:px-8">
      {/* Filter */}
      <div className="mb-14 flex justify-center">
        <div className="inline-flex gap-1 rounded-full border bg-card/60 p-1.5 backdrop-blur">
          {FILTERS.map((f) => {
            const count = PROJECTS.filter((p) => f === "All" || p.tags.includes(f)).length;
            const isActive = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${GRADIENT} shadow-md shadow-blue-500/25`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {f} <span className="opacity-70">({count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function CallToAction() {
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
          Have a project in mind?
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          Tell us about your idea and we&apos;ll show you what&apos;s possible.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
        >
          Start your project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Projects />
        <CallToAction />
      </main>
    </MotionConfig>
  );
}