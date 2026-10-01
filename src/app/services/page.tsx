"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Cloud,
  Cpu,
  Globe,
  Home,
  Layers,
  PenTool,
  Smartphone,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    text: "Fast, accessible websites and web apps built with modern frameworks.",
    points: ["Next.js & React", "E-commerce & CMS", "Performance & SEO"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    text: "iOS and Android apps with a native feel that users keep coming back to.",
    points: ["React Native & Flutter", "iOS & Android", "App store launch"],
  },
  {
    icon: Layers,
    title: "SaaS Solutions",
    text: "Multi-tenant platforms with auth, billing and analytics built in from day one.",
    points: ["Subscription billing", "Role-based access", "Scalable architecture"],
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    text: "Practical AI that automates routine work and unlocks insight from your data.",
    points: ["LLMs & chatbots", "Automation workflows", "Predictive analytics"],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    text: "Research-led interfaces that look great and feel effortless to use.",
    points: ["User research", "Prototyping", "Design systems"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Reliable infrastructure, automated pipelines and secure deployments.",
    points: ["AWS, GCP & Azure", "CI/CD automation", "Monitoring & security"],
  },
];

const PROCESS = [
  {
    title: "Discover",
    text: "We dig into your goals, users and constraints to define what success looks like.",
  },
  {
    title: "Design",
    text: "Wireframes and clickable prototypes before a single line of code is written.",
  },
  {
    title: "Develop",
    text: "Agile sprints with weekly demos, so you always see real progress.",
  },
  {
    title: "Deliver",
    text: "We launch, monitor and keep improving the product alongside you.",
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
          Services
        </li>
      </ol>
    </motion.nav>
  );
}

/** Icon bubble that drifts at its own speed on scroll and floats gently */
function Chip({
  icon: Icon,
  y,
  delay,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  y: MotionValue<number>;
  delay: number;
  className: string;
}) {
  return (
    <motion.div style={{ y }} className={`absolute hidden lg:block ${className}`}>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card/80 shadow-xl backdrop-blur"
      >
        <Icon className="h-7 w-7 text-blue-600 dark:text-cyan-400" />
      </motion.div>
    </motion.div>
  );
}

/** Card with a glow that follows the cursor */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(59,130,246,0.15), transparent 80%)`;

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
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute right-6 top-4 text-6xl font-black tabular-nums text-foreground/[0.05]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <span
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:rotate-6`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
        <p className="mb-6 text-muted-foreground">{service.text}</p>

        <ul className="mb-8 space-y-2.5">
          {service.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400">
                <Check className="h-3 w-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-cyan-400"
        >
          Discuss this service
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden">
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
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      />

      {/* Floating service icons */}
      <Chip icon={Globe} y={y1} delay={0} className="left-[8%] top-[34%]" />
      <Chip icon={Smartphone} y={y2} delay={1} className="left-[18%] top-[62%]" />
      <Chip icon={Cpu} y={y3} delay={0.5} className="right-[18%] top-[30%]" />
      <Chip icon={Cloud} y={y1} delay={1.5} className="right-[8%] top-[58%]" />
      <Chip icon={PenTool} y={y2} delay={2} className="left-[30%] top-[18%]" />

      <div className="container relative mx-auto px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
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
                Services
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            End-to-end software development services tailored to your unique
            business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]`}
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center rounded-full border px-7 py-3.5 font-semibold transition-colors hover:bg-muted"
            >
              Explore services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="container mx-auto scroll-mt-24 px-4 py-24 sm:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-5xl"
      >
        What we can{" "}
        <span className={`bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}>
          build for you
        </span>
      </motion.h2>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });

  return (
    <section className="border-y bg-muted/30 py-28">
      <div className="container mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-5xl"
        >
          How we work
        </motion.h2>

        <div ref={ref} className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line fills as you scroll (desktop) */}
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
              <span
                className={`relative mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT} text-lg font-bold text-white shadow-lg shadow-blue-500/25 ring-8 ring-muted/30`}
              >
                {i + 1}
              </span>
              <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
              <p className="mx-auto max-w-xs text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
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
          Not sure which service you need?
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
          Book a free consultation and we&apos;ll help you find the right
          approach for your product and budget.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition-transform hover:scale-[1.04]"
        >
          Book a consultation
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <ServicesGrid />
        <Process />
        <CallToAction />
      </main>
    </MotionConfig>
  );
}