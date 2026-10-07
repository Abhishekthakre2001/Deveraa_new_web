"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code, Smartphone, Cloud, Cpu, PenTool, Database, type LucideIcon } from "lucide-react";

/**
 * DevEraa — Services section (cards, one screen, light + dark)
 *
 * Fits inside a single viewport (100svh).
 *  - Desktop: 3 x 2 grid of cards, each with an image on the left and text on the right.
 *  - Tablet:  2 x 3 grid.
 *  - Mobile:  one row of cards you swipe sideways (snaps to each card).
 * Cards rise in one after another when the section scrolls into view.
 * Images live in /public/services (replace them with your own photos any time).
 */

type Service = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  image: string;
  stack: string[];
};

const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    label: "Frontend and backend",
    description: "High-performance web applications built with Next.js, React and modern architecture.",
    icon: Code,
    image: "https://img.magnific.com/free-photo/web-design-concepts-with-blurred-background_1134-82.jpg?semt=ais_hybrid&w=740&q=80",
    stack: ["Next.js", "React", "Node.js"],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    label: "iOS and Android",
    description: "Native-feeling apps for both platforms from a single codebase, built with React Native.",
    icon: Smartphone,
    image: "https://img.magnific.com/premium-vector/website-vector-design-template_737924-6273.jpg?semt=ais_hybrid&w=740&q=80",
    stack: ["React Native", "Expo", "Offline mode"],
  },
  {
    id: "saas",
    title: "SaaS Development",
    label: "Scalable platforms",
    description: "End-to-end product development, from architecture to subscriptions and billing.",
    icon: Cloud,
    image: "https://img.magnific.com/free-photo/saas-concept-collage_23-2149399295.jpg?semt=ais_hybrid&w=740&q=80",
    stack: ["Multi-tenant", "Billing", "Auth and roles"],
  },
  {
    id: "ai",
    title: "AI Solutions",
    label: "Machine learning",
    description: "Add large language models and machine learning to your product and daily operations.",
    icon: Cpu,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgldqEEJQXrtGGqogal9fbicFN5e5eHyAVga7uyZdRBL41c0tDa5iUZrNH&s=10",
    stack: ["LLM apps", "Chatbots", "Automation"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    label: "Product design",
    description: "Clear, intuitive interfaces people enjoy using, designed to turn visitors into customers.",
    icon: PenTool,
    image: "https://img.pikbest.com/wp/202547/app-ui-ux-design-and-coding-development-concept-illustration-vector_12125714.jpg!sw800",
    stack: ["Research", "Prototypes", "Design systems"],
  },
  {
    id: "cloud",
    title: "Cloud and DevOps",
    label: "Infrastructure",
    description: "Scalable infrastructure and automated deployments that keep your product reliable.",
    icon: Database,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkA4RV_G7dsTM5dLwRaz5tI4i2w7SS5-NjuFni7cNA3x861Nf7jm6ISIe3&s=10",
    stack: ["AWS", "Docker", "CI/CD"],
  },
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesSection() {
  const reduce = !!useReducedMotion();

  return (
    <section className="relative flex h-[100svh] flex-col overflow-hidden bg-white py-6 text-slate-900 sm:py-10 dark:bg-[#0a1020] dark:text-white">
      {/* quiet backdrop */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-600/15" />

      <div className="container relative mx-auto flex min-h-0 flex-1 flex-col px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-5 flex shrink-0 items-end justify-between gap-10 sm:mb-8"
        >
          <h2 className="max-w-3xl font-serif text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
            Everything it takes to design, build and run your product.
          </h2>
          <p className="hidden max-w-xs pb-1 leading-relaxed text-slate-600 xl:block dark:text-slate-400">
            One team for the whole journey, so nothing gets lost between design, code and launch.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.ul
          variants={list}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="-mx-4 flex min-h-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.id}
                variants={cardIn}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex min-h-0 w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-colors duration-300 hover:border-blue-400/60 sm:w-auto sm:flex-row lg:rounded-3xl dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/50"
              >
                {/* Image */}
                <div className="relative h-2/5 shrink-0 overflow-hidden sm:h-auto sm:w-[40%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full bg-slate-800 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm">
                    <Icon size={18} />
                  </span>
                </div>

                {/* Text */}
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center p-4 sm:p-5 lg:p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                  <h3 className="mt-1 font-serif text-xl leading-tight sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-[15px] dark:text-slate-400">
                    {s.description}
                  </p>
                  <ul className="mt-3 hidden flex-wrap gap-1.5 [@media(min-height:760px)]:flex">
                    {s.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700 dark:border-white/10 dark:text-slate-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}